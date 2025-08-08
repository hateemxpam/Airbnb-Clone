// src/pages/Host/BasicInfo.jsx
import { useNavigate } from "react-router-dom";
import { useListing } from "../../context/ListingContext"; // ✅ context hook

const BasicInfo = () => {
  const navigate = useNavigate();
  const { listing, updateListing } = useListing();

  const limits = {
    guests: 15,
    bedrooms: 20,
    beds: 60,
    bathrooms: 10,
  };

  const handleChange = (field, operation) => {
    let current = listing[field] || 1;

    let newValue = operation === "inc" ? current + 1 : current - 1;

    if (newValue < 1) newValue = 1;
    if (newValue > limits[field]) newValue = limits[field];

    updateListing(field, newValue);
  };

  const handleNext = () => {
    navigate("/host/home/photos");
  };

  return (
    <div className="min-h-screen p-8 flex justify-center items-center">
      <div className="w-full max-w-2xl space-y-8">
        <h2 className="text-3xl font-semibold">
          Share some basics about your place
        </h2>
        <p className="text-gray-500">
          You'll add more details later, like bed types.
        </p>

        {["guests", "bedrooms", "beds", "bathrooms"].map((field) => (
          <div
            key={field}
            className="flex justify-between items-center border-b py-4"
          >
            <div className="capitalize font-medium text-lg">{field}</div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleChange(field, "dec")}
                className="w-8 h-8 rounded-full border text-xl text-gray-700 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center">{listing[field] || 1}</span>
              <button
                onClick={() => handleChange(field, "inc")}
                className="w-8 h-8 rounded-full border text-xl text-gray-700 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/host/home/location")}
            className="px-6 py-3 rounded-full border hover:bg-gray-100"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
