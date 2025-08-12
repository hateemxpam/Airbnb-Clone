const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('../utils/multerConfig');


router.post('/extra-info', async (req, res) => {
  const { userId, profileImage, about, rating, location } = req.body;

  try {
    const info = await prisma.userExtraInfo.create({
      data: {
        userId: parseInt(userId),
        profileImage,
        about,
        rating,
        location,
      },
    });

    res.status(201).json(info);
  } catch (err) {
    console.error('Error saving extra info:', err.message);
    res.status(500).json({ error: 'Could not save extra info.' });
  }
});


router.post('/apartment', async (req, res) => {
  const {
    userId,
    title,
    description,
    propertyType,
    placeType,
    location,
    price,
    imageUrls,
    guests,
    bedrooms,
    beds,
    bathrooms,
  } = req.body;

  try {
    const apartment = await prisma.apartment.create({
      data: {
        userId: parseInt(userId),
        title,
        description,
        propertyType,
        placeType,
        location,
        price,
        imageUrls,
        guests,
        bedrooms,
        beds,
        bathrooms,
      },
    });

    res.status(201).json(apartment);
  } catch (err) {
    console.error('Error saving apartment:', err.message);
    res.status(500).json({ error: 'Could not save apartment.' });
  }
});


router.get('/dashboard/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const host = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      include: {
        extraInfo: true,
        apartments: {
          include: {
            images: true
          }
        },
      },
    });

    if (!host || host.role !== 'host') {
      return res.status(404).json({ message: 'Host not found or not authorized.' });
    }

    res.json(host);

  } catch (error) {
    console.error('Error fetching dashboard data:', error.message);
    res.status(500).json({ error: 'Server error while loading dashboard.' });
  }
});

router.post('/create-apartment', async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      propertyType,
      placeType,
      location,
      price,
      guests,
      bedrooms,
      beds,
      bathrooms,
    } = req.body;

    const apartment = await prisma.apartment.create({
      data: {
        userId: parseInt(userId),
        title,
        description,
        propertyType,
        placeType,
        location,
        price: parseFloat(price),
        guests: parseInt(guests),
        bedrooms: parseInt(bedrooms),
        beds: parseInt(beds),
        bathrooms: parseInt(bathrooms),
      },
    });

    res.status(201).json({
      message: 'Apartment created successfully',
      apartment,
    });

  } catch (err) {
    console.error('Error creating apartment:', err);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
});

router.post('/upload-images', upload.array('images', 10), async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/media/${file.filename}`);
    res.status(200).json({ imageUrls });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Image upload failed' });
  }
});

// POST /api/host/apartment-images - Create apartment images
router.post('/apartment-images', async (req, res) => {
  try {
    const imageData = req.body;
    
    const createdImages = await prisma.apartmentImage.createMany({
      data: imageData,
    });

    res.status(201).json({
      message: 'Apartment images created successfully',
      count: createdImages.count,
    });
  } catch (error) {
    console.error('Error creating apartment images:', error);
    res.status(500).json({ error: 'Failed to create apartment images' });
  }
});

// PUT /api/host/profile-image - Upsert host profile image
router.put('/profile-image', async (req, res) => {
  try {
    const { userId, url } = req.body;
    if (!userId || !url) {
      return res.status(400).json({ error: 'userId and url are required' });
    }
    const updated = await prisma.userExtraInfo.upsert({
      where: { userId: parseInt(userId) },
      update: { profileImage: url },
      create: { userId: parseInt(userId), profileImage: url },
    });
    res.status(200).json({ message: 'Profile image updated', extraInfo: updated });
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ error: 'Failed to update profile image' });
  }
});

// DELETE /api/host/apartment/:id - Delete an apartment and its images
router.delete('/apartment/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const apartmentId = parseInt(id);
    // Delete related images first
    await prisma.apartmentImage.deleteMany({ where: { apartmentId } });
    // Then delete apartment
    await prisma.apartment.delete({ where: { id: apartmentId } });
    res.status(200).json({ message: 'Apartment deleted successfully' });
  } catch (error) {
    console.error('Error deleting apartment:', error);
    res.status(500).json({ error: 'Failed to delete apartment' });
  }
});

// PUT /api/host/profile - Update host profile (name and about only)
router.put('/profile', async (req, res) => {
  try {
    const { userId, name, about } = req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    // Update name on User if provided
    if (typeof name === 'string' && name.trim().length > 0) {
      await prisma.user.update({
        where: { id: parseInt(userId) },
        data: { name: name.trim() },
      });
    }

    // Upsert about on UserExtraInfo if provided
    let extraInfo;
    if (typeof about === 'string') {
      extraInfo = await prisma.userExtraInfo.upsert({
        where: { userId: parseInt(userId) },
        update: { about },
        create: { userId: parseInt(userId), about },
      });
    } else {
      extraInfo = await prisma.userExtraInfo.findUnique({ where: { userId: parseInt(userId) } });
    }

    const user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });
    res.status(200).json({ message: 'Profile updated', user, extraInfo });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

module.exports = router;
