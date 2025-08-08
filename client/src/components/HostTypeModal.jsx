import { useState } from "react";

const HostTypeModal = ({ onClose, onSelect }) => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (type) => {
    setSelected(type);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">
          What would you like to host?
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Home Option */}
          <div
            className={`flex-1 border rounded-lg p-6 cursor-pointer transition hover:shadow-lg ${
              selected === "home"
                ? "border-rose-500 ring-2 ring-rose-400"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect("home")}
          >
            <h3 className="text-lg font-medium mb-2">🏠 Home</h3>
            <p className="text-sm text-gray-600">
              List your apartment, house, cottage, or any property you want to
              rent.
            </p>
          </div>

          {/* Service Option */}
          <div
            className={`flex-1 border rounded-lg p-6 cursor-pointer transition hover:shadow-lg ${
              selected === "service"
                ? "border-rose-500 ring-2 ring-rose-400"
                : "border-gray-300"
            }`}
            onClick={() => handleSelect("service")}
          >
            <h3 className="text-lg font-medium mb-2">🛠️ Service</h3>
            <p className="text-sm text-gray-600">
              Offer a tour guide, cleaning, or any short-term guest service.
            </p>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-6 text-right">
          <button
            className={`px-6 py-2 rounded-full text-white text-sm font-medium ${
              selected
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            disabled={!selected}
            onClick={() => onSelect(selected)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostTypeModal;
