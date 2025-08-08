import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListing } from "../../context/ListingContext"; // ✅ Import context hook

const PROPERTY_TYPES = [
  { label: "House", icon: "🏠" },
  { label: "Apartment", icon: "🏢" },
  { label: "Barn", icon: "🏚️" },
  { label: "Castle", icon: "🏰" },
  { label: "Hotel", icon: "🏨" },
  { label: "Farmhouse", icon: "🌾" },
  { label: "Guest House", icon: "🛏️" },
  { label: "Tent", icon: "⛺" },
  { label: "Container", icon: "🚚" },
];

const PLACE_TYPES = [
  { label: "Entire place", desc: "Guests have the whole place to themselves." },
  {
    label: "Private room",
    desc: "Guests have their own room in a shared space.",
  },
  { label: "Shared room", desc: "Guests share the room with others." },
];

const PropertyType = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const { updateListing } = useListing();
  const navigate = useNavigate();

  const handleNext = () => {
    if (!selectedType || !selectedPlace) return;

    updateListing("propertyType", selectedType);
    updateListing("placeType", selectedPlace);

    navigate("/host/home/location");
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Property type */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">
            Which of these best describes your place?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {PROPERTY_TYPES.map((type) => (
              <div
                key={type.label}
                onClick={() => setSelectedType(type.label)}
                className={`cursor-pointer border rounded-xl p-6 text-center transition ${
                  selectedType === type.label
                    ? "border-rose-500 bg-rose-50 ring-2 ring-rose-300"
                    : "border-gray-300"
                }`}
              >
                <div className="text-4xl mb-2">{type.icon}</div>
                <p className="font-medium">{type.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Place type */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            What will guests have?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {PLACE_TYPES.map((place) => (
              <div
                key={place.label}
                onClick={() => setSelectedPlace(place.label)}
                className={`cursor-pointer border rounded-xl p-6 transition ${
                  selectedPlace === place.label
                    ? "border-rose-500 bg-rose-50 ring-2 ring-rose-300"
                    : "border-gray-300"
                }`}
              >
                <h3 className="font-medium text-lg mb-1">{place.label}</h3>
                <p className="text-sm text-gray-600">{place.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next */}
        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/host/home")}
            className="px-6 py-3 rounded-full border hover:bg-gray-100"
          >
            Back
          </button>
          <button
            disabled={!selectedType || !selectedPlace}
            onClick={handleNext}
            className={`px-6 py-3 rounded-full text-white text-sm font-medium transition ${
              selectedType && selectedPlace
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

export default PropertyType;
