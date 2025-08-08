import React from "react";
import SignInForm from "../components/SignInForm";
import SignUpForm from "../components/SignUpForm";
import Navbar from "../components/Navbar";
import dummyListings from "../dummyArray";
import SearchBar from "../components/SearchBar";
import ListingCard from "../components/ListingCard";

const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Navbar />
      <SearchBar />
      <div className="w-full px-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Recommended Places
        </h2>
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {dummyListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
