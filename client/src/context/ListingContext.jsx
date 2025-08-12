import React, { createContext, useContext, useState } from 'react';

const ListingContext = createContext();

export const useListing = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error('useListing must be used within a ListingProvider');
  }
  return context;
};

export const ListingProvider = ({ children }) => {
  const [listingData, setListingData] = useState({
    propertyType: '',
    placeType: '',
    location: '',
    address: '',
    guests: '',
    bedrooms: '',
    beds: '',
    bathrooms: '',
    title: '',
    description: '',
    images: [],
    price: '',
  });

  const updateListingData = (newData) => {
    setListingData(prev => ({ ...prev, ...newData }));
  };

  const clearListingData = () => {
    setListingData({
      propertyType: '',
      placeType: '',
      location: '',
      address: '',
      guests: '',
      bedrooms: '',
      beds: '',
      bathrooms: '',
      title: '',
      description: '',
      images: [],
      price: '',
    });
  };

  const value = {
    listingData,
    updateListingData,
    clearListingData,
  };

  return (
    <ListingContext.Provider value={value}>
      {children}
    </ListingContext.Provider>
  );
}; 