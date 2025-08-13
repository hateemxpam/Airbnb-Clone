import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiTrash2 } from "react-icons/fi";
import axios from "../api/axios";

const ListingCarousel = ({ listings = [], onDeleted }) => {
  const [currentListingIndex, setCurrentListingIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-advance images every 3 seconds
  useEffect(() => {
    if (listings.length === 0) return;
    
    const currentListing = listings[currentListingIndex];
    if (!currentListing?.images || currentListing.images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => 
        (prev + 1) % currentListing.images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [currentListingIndex, listings]);

  // Reset image index when listing changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentListingIndex]);

  if (!listings || listings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <div className="text-6xl text-gray-400 mb-4">🏠</div>
        <p className="text-gray-500 text-lg font-medium">No listings yet</p>
        <p className="text-gray-400 text-sm">Create your first listing to get started</p>
      </div>
    );
  }

  const currentListing = listings[currentListingIndex];
  const hasMultipleListings = listings.length > 1;
  const hasMultipleImages = currentListing?.images && currentListing.images.length > 1;

  const nextListing = () => {
    setCurrentListingIndex((prev) => (prev + 1) % listings.length);
  };

  const prevListing = () => {
    setCurrentListingIndex((prev) => (prev - 1 + listings.length) % listings.length);
  };

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev + 1) % currentListing.images.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setCurrentImageIndex((prev) => (prev - 1 + currentListing.images.length) % currentListing.images.length);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this listing? This action cannot be undone.');
    if (!confirmed) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/host/apartment/${currentListing.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (onDeleted) onDeleted(currentListing.id);
      
      // Adjust current index if we're at the end
      if (currentListingIndex >= listings.length - 1) {
        setCurrentListingIndex(Math.max(0, listings.length - 2));
      }
    } catch (err) {
      console.error('Failed to delete listing', err);
      alert('Failed to delete listing');
    }
  };

  return (
    <div className="relative h-full">
      {/* Main listing card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
        {/* Image section with carousel */}
        <div className="relative h-48 bg-gray-100">
          {currentListing.images && currentListing.images.length > 0 ? (
            <>
              <img
                src={`http://localhost:5000${currentListing.images[currentImageIndex].url}`}
                alt={currentListing.title}
                className="w-full h-full object-cover"
              />
              
              {/* Image navigation arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <FiChevronLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
                  >
                    <FiChevronRight size={16} />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {currentListing.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-4xl">🏠</span>
            </div>
          )}
          
          {/* Delete button */}
          <button
            onClick={handleDelete}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 text-red-600 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition"
            title="Delete listing"
          >
            <FiTrash2 size={14} />
          </button>
        </div>

        {/* Content section */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
            {currentListing.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
            {currentListing.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-rose-600">
              ${currentListing.price}/night
            </span>
            <span
              className={`px-3 py-1 text-xs rounded-full font-medium ${
                currentListing.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {currentListing.status || "Pending"}
            </span>
          </div>
        </div>
      </div>

      {/* Listing navigation arrows */}
      {hasMultipleListings && (
        <>
          <button
            onClick={prevListing}
            className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition z-10"
          >
            <FiChevronLeft size={20} className="text-gray-700" />
          </button>
          <button
            onClick={nextListing}
            className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition z-10"
          >
            <FiChevronRight size={20} className="text-gray-700" />
          </button>
          
          {/* Listing indicators */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {listings.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentListingIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentListingIndex 
                    ? 'bg-rose-500' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListingCarousel;
