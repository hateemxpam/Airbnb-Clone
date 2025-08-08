// src/components/HostListings.jsx

const HostListings = ({ listings }) => {
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
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostListings;
