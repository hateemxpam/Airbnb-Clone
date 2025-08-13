import React, { useState, useEffect, useMemo } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiEdit2, FiSave, FiXCircle } from "react-icons/fi";
import axios from "../api/axios";
import { toast } from "react-toastify";

const fieldLabel = {
  propertyType: 'Property type',
  placeType: 'Place type',
  address: 'Address',
  location: 'Location',
  guests: 'Guests',
  bedrooms: 'Bedrooms',
  beds: 'Beds',
  bathrooms: 'Bathrooms',
  title: 'Title',
  description: 'Description',
  price: 'Price',
};

const numericFields = ['guests', 'bedrooms', 'beds', 'bathrooms', 'price'];

const ListingDetailsModal = ({ open, onClose, listing, onUpdated }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setCurrentImage(0);
    setIsEditing(false);
    setDraft(listing ? {
      title: listing.title || '',
      description: listing.description || '',
      price: listing.price ?? 0,
      propertyType: listing.propertyType || '',
      placeType: listing.placeType || '',
      address: listing.address || '', // not persisted but shown
      location: listing.location || '',
      guests: listing.guests ?? 0,
      bedrooms: listing.bedrooms ?? 0,
      beds: listing.beds ?? 0,
      bathrooms: listing.bathrooms ?? 0,
    } : null);
  }, [listing]);

  if (!open || !listing) return null;

  const images = listing.images || [];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const statusClass = {
    Active: "bg-green-100 text-green-700 border-green-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Inactive: "bg-gray-100 text-gray-500 border-gray-200",
  }[listing.status] || "bg-gray-100 text-gray-500 border-gray-200";

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: draft.title,
        description: draft.description,
        propertyType: draft.propertyType,
        placeType: draft.placeType,
        location: draft.location,
        price: Number(draft.price),
        guests: Number(draft.guests),
        bedrooms: Number(draft.bedrooms),
        beds: Number(draft.beds),
        bathrooms: Number(draft.bathrooms),
      };
      const res = await axios.put(`/host/apartment/${listing.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updated = res.data.apartment;
      setIsEditing(false);
      toast.success('Listing updated');
      if (onUpdated) onUpdated(updated);
    } catch (e) {
      console.error('Update failed', e);
      toast.error('Failed to update listing');
    } finally {
      setSaving(false);
    }
  };

  const renderEditableInput = (key) => {
    const isNumeric = numericFields.includes(key);
    return (
      <input
        type={isNumeric ? "number" : "text"}
        className="border px-3 py-1 rounded w-40 text-right"
        value={draft[key] ?? ''}
        onChange={(e) => setDraft({ ...draft, [key]: isNumeric ? e.target.value : e.target.value })}
      />
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 p-0 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Top actions */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center shadow hover:bg-rose-100 transition"
          title="Close"
        >
          <FiX size={24} className="text-gray-700" />
        </button>

        {/* Image Carousel */}
        <div className="relative h-96 bg-gray-100">
          {images.length > 0 ? (
            <img
              src={`http://localhost:5000${images[currentImage].url}`}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl text-gray-300">🏠</div>
          )}

          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
              >
                <FiChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition"
              >
                <FiChevronRight size={20} />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <div key={idx} className={`w-3 h-3 rounded-full ${idx === currentImage ? 'bg-white' : 'bg-white/50'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details */}
        <div className="p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            {isEditing ? (
              <input
                className="text-3xl font-bold text-gray-900 flex-1 border-b focus:outline-none"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            ) : (
              <h2 className="text-3xl font-bold text-gray-900 flex-1">{listing.title}</h2>
            )}
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 text-base rounded-full font-semibold shadow-sm border ${statusClass}`}>
                {listing.status || 'Pending'}
              </span>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 rounded-full border hover:bg-gray-100 flex items-center gap-2">
                  <FiEdit2 /> Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} disabled={saving} className="px-4 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-50 flex items-center gap-2">
                    <FiSave /> {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button onClick={() => { setIsEditing(false); setDraft({
                    title: listing.title || '',
                    description: listing.description || '',
                    price: listing.price ?? 0,
                    propertyType: listing.propertyType || '',
                    placeType: listing.placeType || '',
                    address: listing.address || '',
                    location: listing.location || '',
                    guests: listing.guests ?? 0,
                    bedrooms: listing.bedrooms ?? 0,
                    beds: listing.beds ?? 0,
                    bathrooms: listing.bathrooms ?? 0,
                  }); }} className="px-4 py-2 rounded-full border hover:bg-gray-100 flex items-center gap-2">
                    <FiXCircle /> Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Grid Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-6">
            {[
              'propertyType','placeType','address','location','guests','bedrooms','beds','bathrooms'
            ].map((key) => (
              <div key={key} className="flex justify-between items-start gap-4">
                <span className="text-gray-500">{fieldLabel[key]}</span>
                {isEditing && key !== 'address' ? (
                  renderEditableInput(key)
                ) : (
                  <span className="font-medium text-gray-900 ml-4 text-right max-w-[60%] truncate">{String((isEditing && key === 'address' ? draft[key] : listing[key]) ?? '-')}</span>
                )}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6">
            <div className="text-gray-500 mb-1">Description</div>
            {isEditing ? (
              <textarea
                rows={4}
                className="w-full border rounded p-3"
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            ) : (
              <p className="text-gray-800 whitespace-pre-line">{listing.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="text-rose-600 text-2xl font-bold">
              ${isEditing ? draft.price : listing.price}/night
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsModal;
