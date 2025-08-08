// src/components/AddNewListingButton.jsx
import { useNavigate } from "react-router-dom";

const AddNewListingButton = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <button
        onClick={() => navigate("/host/home")}
        className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-semibold"
      >
        + Add New Listing
      </button>
    </div>
  );
};

export default AddNewListingButton;
