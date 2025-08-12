import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { useListing } from '../../context/ListingContext';


const HostPricePage = () => {
  const navigate = useNavigate();
  const { listingData, updateListingData } = useListing();
  const [price, setPrice] = useState(listingData.price || '');
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const reviewItems = useMemo(() => ([
    { label: 'Property type', value: listingData.propertyType || '-' },
    { label: 'Place type', value: listingData.placeType || '-' },
    { label: 'Address', value: listingData.address || '-' },
    { label: 'Title', value: listingData.title || '-' },
    { label: 'Guests', value: listingData.guests || '-' },
    { label: 'Bedrooms', value: listingData.bedrooms || '-' },
    { label: 'Beds', value: listingData.beds || '-' },
    { label: 'Bathrooms', value: listingData.bathrooms || '-' },
    { label: 'Description', value: listingData.description || '-' },
  ]), [listingData]);

  // Build absolute URLs for media paths so thumbnails load
  const apiOrigin = useMemo(() => {
    const base = (axios && axios.defaults && axios.defaults.baseURL) || '';
    return base.replace(/\/?api\/?$/, '') || 'http://localhost:5000';
  }, []);

  const resolveImageSrc = (maybeUrl) => {
    if (!maybeUrl) return '';
    const url = typeof maybeUrl === 'string' ? maybeUrl : maybeUrl.url;
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) return url;
    return `${apiOrigin}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  const handleSubmit = () => {
    if (!price || Number(price) <= 0) {
      alert('Please enter a valid price.');
      return;
    }
    // ✅ Store price in context before confirming
    updateListingData({ price: Number(price) });
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

      const uploadedImageUrls = listingData.images?.length
        ? listingData.images
        : JSON.parse(localStorage.getItem('uploadedImageUrls') || '[]');

      // ✅ Use real data from context instead of hardcoded placeholders
      const apartmentData = {
        userId,
        title: listingData.title,
        description: listingData.description,
        propertyType: listingData.propertyType,
        placeType: listingData.placeType,
        location: listingData.location,
        price: price,
        guests: listingData.guests,
        bedrooms: listingData.bedrooms,
        beds: listingData.beds,
        bathrooms: listingData.bathrooms,
      };

      const apartmentResponse = await axios.post('/host/create-apartment', apartmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (uploadedImageUrls.length > 0) {
        const imageData = uploadedImageUrls.map((url) => ({
          url,
          apartmentId: apartmentResponse.data.apartment.id,
        }));

        await axios.post('/host/apartment-images', imageData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

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
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold">Now, set a weekday base price</h1>
        <p className="text-gray-500">💡 Start with a competitive rate to attract your first guests.</p>
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

      {/* Review removed from main page; now shown only in modal after Submit */}

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

      {/* 🪟 Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-lg space-y-4">
            <h2 className="text-xl font-semibold text-center">Confirm your listing</h2>
            <div className="text-center text-gray-600">
              Base price: <span className="font-semibold text-gray-900">${price}</span>
            </div>
            <div className="border rounded-lg p-4 max-h-64 overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                {reviewItems.map((item) => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-900 ml-4 text-right max-w-[60%] truncate">{String(item.value)}</span>
                  </div>
                ))}
              </div>
              {listingData.images && listingData.images.length > 0 && (
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {listingData.images.slice(0, 5).map((u, idx) => (
                    <img key={idx} src={resolveImageSrc(u)} alt={`m-${idx}`} className="w-full h-14 object-cover rounded" />
                  ))}
                </div>
              )}
            </div>

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
                {saving ? 'Publishing...' : 'Confirm and Publish'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostPricePage;
