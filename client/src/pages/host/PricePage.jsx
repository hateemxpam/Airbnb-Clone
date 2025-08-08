// src/pages/Host/HostPricePage.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useListing } from "../../context/ListingContext"; // ✅ context hook
import axios from "../../api/axios"; // ✅ your API setup

const HostPricePage = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { listing, updateListing, resetListing } = useListing(); // ✅ Context access
  const userId = localStorage.getItem("userId"); // ✅ Currently logged in user

  const handleSubmit = () => {
    if (!price || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    updateListing("price", parseFloat(price)); // ✅ Save price to context
    setShowModal(true);
  };

  const handleConfirm = async () => {
    setShowModal(false);

    try {
      const payload = {
        ...listing,
        price: parseFloat(price),
        userId: parseInt(userId),
      };

      const res = await axios.post("/host/create-apartment", payload);

      if (res.status === 201 || res.status === 200) {
        alert("✅ Listing created successfully!");
        resetListing();
        navigate("/host/dashboard");
      } else {
        alert("❌ Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Listing submission failed:", error);
      alert("❌ Failed to submit listing. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-gray-600 hover:text-black border px-4 py-2 rounded-full shadow-sm transition"
      >
        ← Back
      </button>

      {/* 🏷️ Title & Tip */}
      <div className="text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold">Now, set a weekday base price</h1>
        <p className="text-gray-500">
          💡 Set a price that’s competitive and attractive to first-time guests.
        </p>
      </div>

      {/* 💰 Price Input */}
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
        className="mt-12 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full shadow-lg transition"
      >
        Submit Price
      </button>

      {/* 🪟 Modal (Glass Effect) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md text-center space-y-4">
            <h2 className="text-xl font-semibold">Confirm Your Price</h2>
            <p className="text-gray-600">
              Are you sure you want to proceed with <strong>${price}</strong> as
              your base price?
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-full border text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-5 py-2 rounded-full bg-rose-500 text-white hover:bg-rose-600 transition"
              >
                Yes, Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostPricePage;
