const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
