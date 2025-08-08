import React, { useState, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import dummyListings from "../dummyArray";
import axios from "../api/axios";

const LandingPage = () => {
  const [listings, setListings] = useState(dummyListings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/apartment');
        // If we have real listings, use them; otherwise keep dummy data
        if (response.data && response.data.length > 0) {
          setListings(response.data);
        }
      } catch (err) {
        console.error('Error fetching listings:', err);
        // Keep dummy data if API fails
        setListings(dummyListings);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <SearchBar />
      <div className="w-full px-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Recommended Places
        </h2>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
