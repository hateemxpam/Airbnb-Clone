import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useListing } from '../../context/ListingContext';

const center = {
  lat: 30.1575, 
  lng: 69.3451, 
};

const LocationStep = () => {
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCuNr4J866MqhlhQR62wOxxvk53Fu88fT4", 
  });

  const [marker, setMarker] = useState(center);
  const [address, setAddress] = useState('');
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const { updateListingData } = useListing();

  // Reverse geocoding function to get address from coordinates
  const getAddressFromCoordinates = useCallback(async (lat, lng) => {
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCuNr4J866MqhlhQR62wOxxvk53Fu88fT4`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        setAddress(formattedAddress);
        return formattedAddress;
      } else {
        setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      }
    } catch (error) {
      console.error('Error getting address:', error);
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  const handleNext = () => {
    if (!address) return;
    updateListingData({ location: `${marker.lat},${marker.lng}`, address });
    navigate('/host/home/basic-info'); 
  };

  const handleMapClick = async (e) => {
    const newMarker = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };
    setMarker(newMarker);
    
    // Get address from the clicked coordinates
    await getAddressFromCoordinates(newMarker.lat, newMarker.lng);
  };

  // Handle manual address input with geocoding
  const handleAddressChange = async (e) => {
    const newAddress = e.target.value;
    setAddress(newAddress);
    
    // If user clears the address, don't search
    if (!newAddress.trim()) return;
    
    // Optional: You can add geocoding here to update the marker when user types an address
    // This would require additional implementation for forward geocoding
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-semibold mb-2">Where's your place located?</h2>
        <p className="text-gray-500 mb-6 text-sm">
          Your address is only shared with guests after they've made a reservation.
        </p>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Click on the map or enter your address"
            value={address}
            onChange={handleAddressChange}
            className="w-full px-12 py-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-rose-400"
            disabled={isLoadingAddress}
          />
          <FaMapMarkerAlt className="absolute top-4 left-4 text-gray-400 text-lg" />
          {isLoadingAddress && (
            <div className="absolute top-4 right-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-rose-500"></div>
            </div>
          )}
        </div>

        <div className="rounded-xl overflow-hidden shadow-md">
          <GoogleMap
            zoom={6}
            center={marker}
            mapContainerStyle={{ height: '400px', width: '100%' }}
            onClick={handleMapClick}
          >
            <Marker position={marker} />
          </GoogleMap>
        </div>

        <p className="text-sm text-gray-500 mt-2 text-center">
          💡 Click anywhere on the map to automatically fill in the address
        </p>

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            onClick={() => navigate('/host/home/property-type')}
            className="px-6 py-3 rounded-full border hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!address || isLoadingAddress}
            className={`px-6 py-3 rounded-full transition ${
              address && !isLoadingAddress
                ? 'bg-rose-500 text-white hover:bg-rose-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
