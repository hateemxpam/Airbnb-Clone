import React, { useState, useEffect } from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";
import dummyListings from "../dummyArray";
import axios from "../api/axios";

const LandingPage = () => {
  const [listings, setListings] = useState(dummyListings);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find your perfect
              <span className="text-rose-500"> getaway</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover unique places to stay and connect with hosts from around the world
            </p>
          </div>
        </div>
      </div>

      <SearchBar />
      
      {/* Listings Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Recommended Places
            </h2>
            <p className="text-gray-600 mt-2">
              {listings.length} amazing places to explore
            </p>
          </div>
          <button
            onClick={() => navigate('/become-a-host')}
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-medium hover:bg-rose-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <span>Become a host</span>
          </button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl h-64 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
