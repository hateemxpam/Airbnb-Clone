import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiHome, FiSparkles } from "react-icons/fi";

const CustomAddListingButton = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      
      {/* Main button */}
      <button
        onClick={() => navigate('/host/choose')}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full h-full min-h-[120px] bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-2 w-8 h-8 border-2 border-white rounded-full"></div>
          <div className="absolute top-8 right-4 w-4 h-4 bg-white rounded-full"></div>
          <div className="absolute bottom-4 left-6 w-6 h-6 border border-white rounded-lg"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-white">
          {/* Icon with animation */}
          <div className="relative mb-3">
            <div className={`w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110 rotate-12' : ''}`}>
              <FiPlus size={24} className="text-white" />
            </div>
            
            {/* Floating sparkles */}
            <div className={`absolute -top-1 -right-1 transition-all duration-300 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <FiSparkles size={16} className="text-yellow-300 animate-pulse" />
            </div>
            <div className={`absolute -bottom-1 -left-1 transition-all duration-300 delay-100 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
              <FiSparkles size={12} className="text-yellow-300 animate-pulse" />
            </div>
          </div>

          {/* Text */}
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">Add New Listing</h3>
            <p className="text-sm text-white/80 font-medium">Start hosting today</p>
          </div>

          {/* Arrow indicator */}
          <div className={`absolute bottom-3 right-3 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <FiHome size={14} />
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  );
};

export default CustomAddListingButton;
