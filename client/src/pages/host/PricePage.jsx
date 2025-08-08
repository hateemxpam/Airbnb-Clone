// src/pages/Host/HostPricePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';

const HostPricePage = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = () => {
    if (!price || price <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setSaving(true);
    
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      if (!userId || !token) {
        alert('Please log in again.');
        return;
      }

      // Get uploaded image URLs from localStorage
      const uploadedImageUrls = JSON.parse(localStorage.getItem('uploadedImageUrls') || '[]');

      // Create a simple listing with basic data
      const apartmentData = {
        userId: userId,
        title: "Beautiful Property",
        description: "A wonderful place to stay",
        propertyType: "House",
        placeType: "Entire place",
        location: "City Center",
        price: parseFloat(price),
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
      };

      // Create the apartment
      const apartmentResponse = await axios.post('/host/create-apartment', apartmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If we have images, create the apartment images
      if (uploadedImageUrls.length > 0) {
        const imageData = uploadedImageUrls.map(url => ({
          url: url,
          apartmentId: apartmentResponse.data.apartment.id,
        }));

        // Create image records
        await axios.post('/host/apartment-images', imageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear the uploaded images from localStorage
      localStorage.removeItem('uploadedImageUrls');

      alert('✅ Listing created successfully!');
      setShowModal(false);
      navigate('/host/dashboard');
      
    } catch (error) {
      console.error('Error creating listing:', error);
      alert('❌ Failed to create listing. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative">
      {/* 🔙 Back Button */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-600 hover:text-black border px-4 py-2 rounded-full shadow-sm transition"
        >
          ← Back
        </button>
      </div>

      {/* 🏷️ Title + Tip */}
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold">Now, set a weekday base price</h1>
        <p className="text-gray-500">
          💡 Start with a competitive rate to attract your first guests.
        </p>
      </div>

      {/* 💵 Price Input */}
      <div className="text-6xl font-bold flex items-center gap-2 mb-4">
        <span>$</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0"
          className="text-6xl w-32 border-b-2 border-gray-300 focus:outline-none focus:border-black text-center"
        />
      </div>

      <p className="text-gray-500 text-sm">Guest price before taxes</p>

      {/* 🔘 Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!price || price <= 0}
        className={`mt-12 px-6 py-3 rounded-full shadow-lg transition ${
          price && price > 0
            ? 'bg-rose-500 hover:bg-rose-600 text-white'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Submit Price
      </button>

      {/* 🪟 Modal (Glass Effect) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold">Confirm your listing</h2>
            <p className="text-gray-600">
              Are you sure you want to create this listing with $<span className="font-bold">{price}</span> as your base price?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                disabled={saving}
                className="px-5 py-2 rounded-full border text-gray-700 hover:bg-gray-100 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={saving}
                className={`px-5 py-2 rounded-full transition ${
                  saving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-rose-500 text-white hover:bg-rose-600'
                }`}
              >
                {saving ? 'Creating...' : 'Yes, Create Listing'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostPricePage;

