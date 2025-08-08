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

module.exports = router;
