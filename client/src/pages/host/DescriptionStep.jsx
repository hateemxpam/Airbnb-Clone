import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListing } from "../../context/ListingContext";

const DescriptionStep = () => {
  const navigate = useNavigate();
  const { updateListing } = useListing();
  const [description, setDescription] = useState(
    "You will have a great and comfortable time in this place.",
  );

  const handleNext = () => {
    if (!description.trim()) {
      alert("Please enter a description before proceeding.");
      return;
    }
    updateListing("description", description);
    navigate("/host/home/price");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <h2 className="text-3xl font-semibold">Create your description</h2>
        <p className="text-gray-500">Share what makes your place special.</p>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400 resize-none text-gray-800"
        />

        <div className="flex justify-between pt-4">
          <button
            onClick={() => navigate("/host/home/photos")}
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

export default DescriptionStep;
