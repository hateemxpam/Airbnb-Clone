import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { IoCardOutline, IoShieldCheckmarkOutline, IoCalendarOutline, IoPeopleOutline, IoLocationOutline, IoHomeOutline } from 'react-icons/io5';
import { AiOutlineLock } from 'react-icons/ai';
import axios from '../api/axios';
import Navbar from '../components/Navbar';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Payment form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Booking details from previous page
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    nights: 0,
    totalPrice: 0
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`/apartment/${id}`);
        setListing(response.data);
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  useEffect(() => {
    // Get booking details from location state or URL params
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    }
  }, [location]);

  // Card number formatting
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // CVV validation
  const formatCvv = (value) => {
    return value.replace(/\D/g, '').slice(0, 4);
  };

  // Form validation
  const isFormValid = () => {
    return cardNumber.replace(/\s/g, '').length >= 13 &&
           cardHolder.trim().length > 0 &&
           expiryMonth &&
           expiryYear &&
           cvv.length >= 3;
  };

  // Handle payment submission
  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Please fill in all required fields correctly');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Redirect to success page or show success message
      alert('Payment successful! Your booking has been confirmed.');
      navigate('/');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error || 'Listing not found'}</p>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IoShieldCheckmarkOutline className="text-green-600" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h1>
                <p className="text-gray-600">Your payment information is encrypted and secure</p>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePayment} className="space-y-6">
                {/* Card Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <IoCardOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {cardNumber.replace(/\s/g, '').length < 13 ? 'Card number must be at least 13 digits' : '✓ Valid card number'}
                  </p>
                </div>

                {/* Card Holder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                    placeholder="XYZ"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    required
                  />
                </div>

                {/* Expiry and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={expiryMonth}
                        onChange={(e) => setExpiryMonth(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Month</option>
                        {Array.from({ length: 12 }, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <select
                        value={expiryYear}
                        onChange={(e) => setExpiryYear(e.target.value)}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        required
                      >
                        <option value="">Year</option>
                        {Array.from({ length: 10 }, (_, i) => {
                          const year = new Date().getFullYear() + i;
                          return (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(formatCvv(e.target.value))}
                      placeholder="123"
                      maxLength="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {cvv.length < 3 ? 'CVV must be at least 3 digits' : '✓ Valid CVV'}
                    </p>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AiOutlineLock className="text-blue-600 mt-1 mr-3" size={20} />
                    <div>
                      <p className="text-sm text-blue-800 font-medium">Secure Payment</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  disabled={!isFormValid() || isProcessing}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 transform ${
                    !isFormValid() || isProcessing
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700 hover:scale-105 shadow-lg'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing Payment...
                    </div>
                  ) : (
                    `Pay Now`
                  )}
                </button>
              </form>
            </div>

            {/* About Your Host Card - Now below the payment form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Your Host</h2>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={listing.hostImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                  alt="Host"
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{listing.hostName || 'Your Host'}</p>
                  <p className="text-sm text-gray-600">Superhost</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your host is committed to providing you with an exceptional stay experience. They have been hosting guests for years and maintain high standards for cleanliness and hospitality.
              </p>
            </div>
          </div>

          {/* Right Column - Booking Summary & House Rules */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Booking Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Summary</h2>
              
              {/* Property Info */}
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                  <p className="text-sm text-gray-600">{listing.location}</p>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <IoCalendarOutline className="mr-2" size={16} />
                    <span className="text-sm">Check-in</span>
                  </div>
                  <span className="text-sm font-medium">
                    {bookingDetails.checkIn || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <IoCalendarOutline className="mr-2" size={16} />
                    <span className="text-sm">Check-out</span>
                  </div>
                  <span className="text-sm font-medium">
                    {bookingDetails.checkOut || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <IoPeopleOutline className="mr-2" size={16} />
                    <span className="text-sm">Guests</span>
                  </div>
                  <span className="text-sm font-medium">
                    {bookingDetails.guests || 1} guest
                  </span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Rs {listing.price} × {bookingDetails.nights || 1} night</span>
                  <span>Rs {listing.price * (bookingDetails.nights || 1)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Service fee</span>
                  <span>Rs 500</span>
                </div>
                <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>Rs {bookingDetails.totalPrice || listing.price + 500}</span>
                </div>
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">House Rules</h2>
              <div className="space-y-4">                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">No Smoking</p>
                    <p className="text-xs text-gray-600">Smoking is not allowed anywhere on the property</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">No Parties</p>
                    <p className="text-xs text-gray-600">Quiet hours from 10:00 PM to 8:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pet Policy</p>
                    <p className="text-xs text-gray-600">Pets are welcome with prior approval</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Respect the Space</p>
                    <p className="text-xs text-gray-600">Treat the property as if it were your own</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancellation Policy</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Free cancellation</span>
                  <span className="text-green-600 font-semibold">Until 24 hours before check-in</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Partial refund</span>
                  <span className="text-yellow-600 font-semibold">24 hours before check-in</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">No refund</span>
                  <span className="text-red-600 font-semibold">After check-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
