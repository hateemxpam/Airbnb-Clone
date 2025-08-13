// src/components/HostListings.jsx
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { FiTrash2, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ListingDetailsModal from "./ListingDetailsModal";

const HostListings = ({ listings = [], onDeleted, onUpdatedListing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalListing, setModalListing] = useState(null);

  const currentListing = listings[currentIndex];
  const hasMultipleListings = listings.length > 1;
  const hasMultipleImages = currentListing?.images && currentListing.images.length > 1;

  useEffect(() => {
    if (!hasMultipleImages || !isImageHovered) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % currentListing.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [currentIndex, hasMultipleImages, isImageHovered, currentListing?.images?.length]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentIndex]);

  if (!listings || listings.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl text-gray-300 mb-4">🏠</div>
        <p className="text-gray-500 text-lg font-medium">No listings yet</p>
        <p className="text-gray-400 text-sm">Create your first listing to get started</p>
      </div>
    );
  }

  const nextListing = () => setCurrentIndex((prev) => (prev + 1) % listings.length);
  const prevListing = () => setCurrentIndex((prev) => (prev - 1 + listings.length) % listings.length);

  const handleDelete = async () => {
    const confirmed = window.confirm('Delete this listing? This action cannot be undone.');
    if (!confirmed) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/host/apartment/${currentListing.id}`, { headers: { Authorization: `Bearer ${token}` } });
      if (onDeleted) onDeleted(currentListing.id);
      if (currentIndex >= listings.length - 1) setCurrentIndex(Math.max(0, listings.length - 2));
    } catch (err) {
      console.error('Failed to delete listing', err);
      alert('Failed to delete listing');
    }
  };

  const openModal = (listing) => { setModalListing(listing); setModalOpen(true); };
  const closeModal = () => { setModalOpen(false); setModalListing(null); };

  const handleUpdatedFromModal = (updated) => {
    closeModal();
    if (onUpdatedListing) {
      onUpdatedListing(updated);
    } else {
      Object.assign(listings[currentIndex], updated);
    }
  };

  return (
    <div className="relative">
      <h3 className="text-lg font-semibold mb-3">Your Listings</h3>

      {/* Larger, fixed-height card */}
      <div className="relative group cursor-pointer" onClick={() => openModal(currentListing)}>
        <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
          {/* Fixed height grid split */}
          <div className="grid grid-cols-1 md:grid-cols-12 h-64 md:h-72">
            {/* Image column */}
            <div
              className="relative md:col-span-7 h-1/2 md:h-full bg-gray-100"
              onMouseEnter={() => setIsImageHovered(true)}
              onMouseLeave={() => setIsImageHovered(false)}
            >
              {currentListing.images && currentListing.images.length > 0 ? (
                <img
                  src={`http://localhost:5000${currentListing.images[currentImageIndex].url}`}
                  alt={currentListing.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl text-gray-300">🏠</div>
              )}

              {/* gradient overlay for readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Image indicators only (no buttons) */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  {currentListing.images.map((_, index) => (
                    <div key={index} className={`w-2 h-2 rounded-full transition ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`} />
                  ))}
                </div>
              )}

              {/* Delete button */}
              <button
                onClick={e => { e.stopPropagation(); handleDelete(); }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 text-red-600 rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition opacity-0 group-hover:opacity-100 z-10"
                title="Delete listing"
              >
                <FiTrash2 size={14} />
              </button>
            </div>

            {/* Details column */}
            <div className="md:col-span-5 h-1/2 md:h-full p-5 md:p-6 flex flex-col gap-4">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-semibold text-xl text-gray-900 line-clamp-2 flex-1">{currentListing.title}</h4>
                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold text-rose-600">${currentListing.price}/night</div>
                  <span className={`inline-block mt-1 px-3 py-1 text-xs rounded-full font-medium ${currentListing.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {currentListing.status || "Pending"}
                  </span>
                </div>
              </div>

              {/* Chips row (wrap) */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{currentListing.propertyType}</span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{currentListing.placeType}</span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{currentListing.guests} guests</span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{currentListing.bedrooms} bd</span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{currentListing.beds} beds</span>
                <span className="px-2 py-1 rounded bg-gray-100 text-gray-700">{currentListing.bathrooms} bath</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 flex-1">
                {currentListing.description}
              </p>

              <div className="flex items-center justify-end">
                <span className="text-xs text-gray-400">Click card to view details</span>
              </div>
            </div>
          </div>
        </div>

        {/* Listing navigation arrows outside card (no overlap) */}
        {hasMultipleListings && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prevListing(); }}
              className="absolute -left-7 top-1/2 -translate-y-1/2 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition z-20"
            >
              <FiChevronLeft size={20} className="text-gray-700" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); nextListing(); }}
              className="absolute -right-7 top-1/2 -translate-y-1/2 w-11 h-11 bg-white shadow-lg rounded-full flex items-center justify-center hover:shadow-xl transition z-20"
            >
              <FiChevronRight size={20} className="text-gray-700" />
            </button>
          </>
        )}
      </div>

      {/* Dots and counter for listings */}
      {hasMultipleListings && (
        <div className="flex justify-center mt-3 gap-2">
          {listings.map((_, index) => (
            <button key={index} onClick={e => { e.stopPropagation(); setCurrentIndex(index); }} className={`w-2.5 h-2.5 rounded-full transition ${index === currentIndex ? 'bg-rose-500' : 'bg-gray-300 hover:bg-gray-400'}`} />
          ))}
        </div>
      )}
      {hasMultipleListings && (
        <div className="text-center mt-1 text-xs text-gray-500">{currentIndex + 1} of {listings.length} listings</div>
      )}

      <ListingDetailsModal open={modalOpen} onClose={closeModal} listing={modalListing} onUpdated={handleUpdatedFromModal} />
    </div>
  );
};

export default HostListings;
