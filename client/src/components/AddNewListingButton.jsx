// src/components/AddNewListingButton.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HostTypeModal from "./HostTypeModal";

const AddNewListingButton = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => navigate('/host/choose')}
        className="w-full sm:w-auto inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg hover:from-rose-600 hover:to-rose-700 transition"
      >
        <span className="text-lg">＋</span>
        <span>Add new listing</span>
      </button>
      {/* Modal removed in favor of dedicated choice page */}
    </>
  );
};

export default AddNewListingButton;
