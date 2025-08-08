const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/apartment - Get all apartments for landing page
router.get('/apartment', async (req, res) => {
  try {
    const apartments = await prisma.apartment.findMany({
      include: {
        images: true,
        user: {
          select: {
            name: true,
            extraInfo: {
              select: {
                profileImage: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Transform data to match frontend expectations
    const formattedApartments = apartments.map(apartment => {
      // Convert relative image URLs to full URLs
      const baseUrl = 'http://localhost:5000'; // Your backend URL
      const imageUrl = apartment.images.length > 0 
        ? `${baseUrl}${apartment.images[0].url}` 
        : 'https://via.placeholder.com/400x300?text=No+Image';
      
      return {
        id: apartment.id,
        title: apartment.title,
        location: apartment.location,
        price: apartment.price,
        image: imageUrl,
        description: apartment.description,
        propertyType: apartment.propertyType,
        placeType: apartment.placeType,
        guests: apartment.guests,
        bedrooms: apartment.bedrooms,
        beds: apartment.beds,
        bathrooms: apartment.bathrooms,
        hostName: apartment.user.name,
        hostImage: apartment.user.extraInfo?.profileImage || 'https://i.pravatar.cc/150?img=3'
      };
    });

    res.json(formattedApartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
});

// POST /api/host/apartment
router.post('/apartment', upload.array('images', 5), async (req, res) => {
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

  try {
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

    // Save image URLs
    const imageRecords = req.files.map((file) => ({
      url: `/media/${file.filename}`,
      apartmentId: apartment.id,
    }));

    await prisma.apartmentImage.createMany({
      data: imageRecords,
    });

    res.status(201).json({ message: 'Apartment created successfully', apartment });
  } catch (error) {
    console.error('Error saving apartment:', error);
    res.status(500).json({ error: 'Failed to create apartment' });
  }
});

module.exports = router;
