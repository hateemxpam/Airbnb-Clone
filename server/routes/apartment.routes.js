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
        hostImage: apartment.user.extraInfo?.profileImage 
          ? `${baseUrl}${apartment.user.extraInfo.profileImage}`
          : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      };
    });

    res.json(formattedApartments);
  } catch (error) {
    console.error('Error fetching apartments:', error);
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
});

// GET /api/apartment/:id - Get single apartment by ID
router.get('/apartment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const apartment = await prisma.apartment.findUnique({
      where: { id: parseInt(id) },
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
      }
    });

    if (!apartment) {
      return res.status(404).json({ error: 'Apartment not found' });
    }

    // Transform data to match frontend expectations
    const baseUrl = 'http://localhost:5000';
    const formattedApartment = {
      id: apartment.id,
      title: apartment.title,
      location: apartment.location,
      price: apartment.price,
      image: apartment.images.length > 0 
        ? `${baseUrl}${apartment.images[0].url}` 
        : 'https://via.placeholder.com/400x300?text=No+Image',
      images: apartment.images.map(img => `${baseUrl}${img.url}`),
      description: apartment.description,
      propertyType: apartment.propertyType,
      placeType: apartment.placeType,
      guests: apartment.guests,
      bedrooms: apartment.bedrooms,
      beds: apartment.beds,
      bathrooms: apartment.bathrooms,
      address: apartment.location, // Using location as address for now
      hostName: apartment.user.name,
      hostImage: apartment.user.extraInfo?.profileImage 
        ? `${baseUrl}${apartment.user.extraInfo.profileImage}`
        : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      amenities: [
        'WiFi', 'Kitchen', 'Free parking', 'Air conditioning',
        'Washer', 'Dryer', 'TV', 'Pool', 'Gym', 'Balcony'
      ] // You can add amenities field to your database later
    };

    res.json(formattedApartment);
  } catch (error) {
    console.error('Error fetching apartment:', error);
    res.status(500).json({ error: 'Failed to fetch apartment' });
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
