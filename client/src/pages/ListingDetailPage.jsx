import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart, AiOutlineUser } from 'react-icons/ai';
import { IoBedOutline, IoHomeOutline, IoStarOutline, IoArrowBackOutline, IoCalendarOutline, IoPeopleOutline } from 'react-icons/io5';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

const ListingDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Date and booking state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [nights, setNights] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/apartment/${id}`);
        setListing(response.data);
        // Set initial guest count to listing's max capacity
        setGuests(response.data.guests);
      } catch (err) {
        console.error('Error fetching listing:', err);
        if (err.response?.status === 404) {
          setError('Listing not found');
        } else {
          setError('Failed to load listing. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  // Calculate nights and total price when dates change
  useEffect(() => {
    if (checkIn && checkOut && listing) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end - start;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNights(diffDays);
        setTotalPrice((listing.price * diffDays) + 500); // Base price + service fee
      } else {
        setNights(0);
        setTotalPrice(0);
      }
    }
  }, [checkIn, checkOut, listing]);

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get minimum checkout date (day after checkin)
  const getMinCheckoutDate = () => {
    if (!checkIn) return getMinDate();
    const checkInDate = new Date(checkIn);
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  // Validate checkout date
  const handleCheckoutChange = (date) => {
    if (date <= checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }
    setCheckOut(date);
  };

  const toggleFavorite = () => {
    setFavorited(prev => !prev);
    // TODO: In future → Save this to user's wishlist via API
  };

  const goToPreviousImage = () => {
    if (!listing?.images) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? (listing.images.length - 1) : prev - 1
    );
  };

  const goToNextImage = () => {
    if (!listing?.images) return;
    setCurrentImageIndex(prev => 
      prev === (listing.images.length - 1) ? 0 : prev + 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading listing...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">🏠</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Use actual images from the listing, fallback to main image if no additional images
  const allImages = listing.images && listing.images.length > 0 
    ? listing.images 
    : [listing.image];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-16 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/')}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <IoArrowBackOutline className="mr-2" size={20} />
              Back to Listings
            </button>
            
            <button
              onClick={toggleFavorite}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              {favorited ? (
                <AiFillHeart size={24} className="text-red-500" />
              ) : (
                <AiOutlineHeart size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
                <img
                  src={allImages[currentImageIndex]}
                  alt={listing.title}
                  className="w-full h-96 object-cover"
                />
              </div>
              
              {/* Image Navigation */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={goToNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
              
              {/* Image Indicators */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mb-8">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${listing.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Listing Details */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{listing.location}</p>
                
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <IoStarOutline className="text-yellow-400" size={20} />
                    <span className="ml-1 text-gray-700">4.8</span>
                    <span className="text-gray-500 ml-1">(128 reviews)</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">Superhost</span>
                </div>
              </div>

              {/* Property Features */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <AiOutlineUser className="mx-auto text-gray-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Guests</p>
                  <p className="font-semibold text-gray-900">{listing.guests}</p>
                </div>
                <div className="text-center">
                  <IoBedOutline className="mx-auto text-gray-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Bedrooms</p>
                  <p className="font-semibold text-gray-900">{listing.bedrooms}</p>
                </div>
                <div className="text-center">
                  <IoBedOutline className="mx-auto text-gray-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Beds</p>
                  <p className="font-semibold text-gray-900">{listing.beds}</p>
                </div>
                <div className="text-center">
                  <IoHomeOutline className="mx-auto text-gray-600 mb-2" size={24} />
                  <p className="text-sm text-gray-600">Bathrooms</p>
                  <p className="font-semibold text-gray-900">{listing.bathrooms}</p>
                </div>
              </div>

              {/* Description */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About this place</h2>
                <p className="text-gray-700 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Property Type and Place Type */}
              <div className="border-b border-gray-200 pb-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Property Details</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <IoHomeOutline className="text-gray-600 mr-3" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Property Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{listing.propertyType || 'Not specified'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <IoPeopleOutline className="text-gray-600 mr-3" size={24} />
                    <div>
                      <p className="text-sm text-gray-600">Place Type</p>
                      <p className="font-semibold text-gray-900 capitalize">{listing.placeType || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
                <p className="text-gray-700 mb-4">
                  {listing.address || listing.location}
                </p>
                <div className="bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                  <p className="text-gray-500">Map placeholder - Location: {listing.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-lg border">
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">Rs {listing.price}</span>
                    <span className="text-gray-600 ml-1">/ night</span>
                  </div>
                  <p className="text-gray-500 text-sm">+ Rs 500 service fee</p>
                </div>

                {/* Date Picker */}
                <div className="mb-6">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border border-gray-300 rounded-lg p-3">
                      <label className="text-xs text-gray-600 uppercase tracking-wide">Check-in</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        min={getMinDate()}
                        className="w-full border-none p-0 text-gray-900 focus:ring-0"
                      />
                    </div>
                    <div className="border border-gray-300 rounded-lg p-3">
                      <label className="text-xs text-gray-600 uppercase tracking-wide">Check-out</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => handleCheckoutChange(e.target.value)}
                        min={getMinCheckoutDate()}
                        disabled={!checkIn}
                        className={`w-full border-none p-0 text-gray-900 focus:ring-0 ${!checkIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Guest Selector */}
                <div className="mb-6">
                  <div className="border border-gray-300 rounded-lg p-3">
                    <label className="text-xs text-gray-600 uppercase tracking-wide">Guests</label>
                    <select 
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full border-none p-0 text-gray-900 focus:ring-0"
                    >
                      {Array.from({ length: listing.guests }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Reserve Button */}
                <button 
                  disabled={!checkIn || !checkOut || nights === 0}
                  onClick={() => {
                    if (checkIn && checkOut && nights > 0) {
                      navigate(`/payment/${id}`, {
                        state: {
                          bookingDetails: {
                            checkIn,
                            checkOut,
                            guests,
                            nights,
                            totalPrice
                          }
                        }
                      });
                    }
                  }}
                  className={`w-full font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform ${
                    !checkIn || !checkOut || nights === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 hover:scale-105'
                  }`}
                >
                  {!checkIn || !checkOut ? 'Select dates' : nights === 0 ? 'Invalid dates' : 'Reserve'}
                </button>

                <p className="text-center text-gray-500 text-sm mt-4">
                  You won't be charged yet
                </p>

                {/* Price Breakdown */}
                {nights > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rs {listing.price} × {nights} {nights === 1 ? 'night' : 'nights'}</span>
                        <span>Rs {listing.price * nights}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>Rs 500</span>
                      </div>
                      <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>Rs {totalPrice}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
