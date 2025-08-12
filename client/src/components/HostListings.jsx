// src/components/HostListings.jsx
import axios from "../api/axios";
import { FiTrash2 } from "react-icons/fi";

const HostListings = ({ listings = [], onDeleted }) => {
  if (!listings || listings.length === 0) {
    return <p className="text-gray-500 text-sm">No listings yet.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Your Listings</h3>
      <div className="space-y-4">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition relative bg-white group"
          >
            {/* Image */}
            {listing.images && listing.images.length > 0 && (
              <div className="mb-3">
                <img
                  src={`http://localhost:5000${listing.images[0].url}`}
                  alt={listing.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
            
            <h4 className="font-medium text-lg">{listing.title}</h4>
            <p className="text-sm text-gray-600">{listing.description}</p>

            <p className="text-sm text-gray-800 font-semibold mt-2">
              ${listing.price}/night
            </p>

            <span
              className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${
                listing.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {listing.status || "Pending"}
            </span>

            {/* Delete icon */}
            <button
              onClick={async () => {
                const confirmed = window.confirm('Delete this listing? This action cannot be undone.');
                if (!confirmed) return;
                try {
                  const token = localStorage.getItem('token');
                  await axios.delete(`/host/apartment/${listing.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  if (onDeleted) onDeleted(listing.id);
                } catch (err) {
                  console.error('Failed to delete listing', err);
                  alert('Failed to delete listing');
                }
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 border text-red-600 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 hover:bg-red-50 transition"
              title="Delete listing"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostListings;
