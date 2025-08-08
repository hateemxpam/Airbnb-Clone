import { useState } from "react";
import ListingContext from "./ListingContext";

const initialState = {
  title: "",
  description: "",
  propertyType: "",
  placeType: "",
  location: "",
  price: 0,
  guests: 0,
  bedrooms: 0,
  beds: 0,
  bathrooms: 0,
  imageUrls: [],
};

export const ListingProvider = ({ children }) => {
  const [listing, setListing] = useState(initialState);

  const updateListing = (field, value) => {
    setListing((prev) => ({ ...prev, [field]: value }));
  };

  const resetListing = () => setListing(initialState);

  return (
    <ListingContext.Provider value={{ listing, updateListing, resetListing }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => {useContext(ListingContext)};

