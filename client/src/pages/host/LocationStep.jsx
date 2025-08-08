import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useListing } from "../../context/ListingContext";

const center = {
  lat: 30.1575,
  lng: 69.3451,
};

const LocationStep = () => {
  const navigate = useNavigate();
  const { updateListing } = useListing();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const [marker, setMarker] = useState(center);
  const [address, setAddress] = useState("");

  const handleNext = () => {
    if (!address) return;

    updateListing("location", address);
    navigate("/host/home/basic-info");
  };

  const handleMapClick = (e) => {
    setMarker({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl font-semibold mb-2">
          Where's your place located?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Your address is only shared with guests after they’ve made a
          reservation.
        </p>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-12 py-4 rounded-full border focus:outline-none focus:ring-2 focus:ring-rose-400"
          />
          <FaMapMarkerAlt className="absolute top-4 left-4 text-gray-400 text-lg" />
        </div>

        <div className="rounded-xl overflow-hidden shadow-md">
          <GoogleMap
            zoom={6}
            center={marker}
            mapContainerStyle={{ height: "400px", width: "100%" }}
            onClick={handleMapClick}
          >
            <Marker position={marker} />
          </GoogleMap>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/host/home/property-type")}
            className="px-6 py-3 rounded-full border text-gray-700 hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            disabled={!address}
            className={`px-6 py-3 rounded-full text-white text-sm font-medium transition ${
              address
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-gray-300 cursor-not-allowed"
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
