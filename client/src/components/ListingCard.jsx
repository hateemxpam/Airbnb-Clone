import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import HostTypeModal from "./HostTypeModal";

const ListingCard = ({ listing }) => {
  const [favorited, setFavorited] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click when clicking heart
    setFavorited((prev) => !prev);
    // TODO: In future → Save this to user's wishlist via API
  };

  const handleCardClick = () => {
    navigate(`/listing/${listing.id}`);
  };

  return (
    <div 
      className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-200 w-full cursor-pointer transform hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      {/* Heart Icon */}
      <div
        className="absolute top-2 right-2 z-10 cursor-pointer bg-white rounded-full p-1 shadow hover:shadow-lg transition-shadow"
        onClick={toggleFavorite}
      >
        {favorited ? (
          <AiFillHeart size={20} className="text-yellow-500" />
        ) : (
          <AiOutlineHeart size={20} className="text-gray-600" />
        )}
      </div>

      {/* Image */}
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-48 object-cover rounded-t-md"
      />

      {/* Details */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-800 truncate">
          {listing.title}
        </h3>
        <p className="text-xs text-gray-500">{listing.location}</p>
        <p className="text-sm text-gray-700 mt-1">
          <span className="font-semibold">Rs {listing.price} $</span> /night
        </p>
      </div>
    </div>
  );
};

export default ListingCard;
