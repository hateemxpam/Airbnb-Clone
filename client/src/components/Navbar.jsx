import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import AirbnbLogo from "./AirbnbLogo";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

// Custom 3D House Icon
const HouseIcon = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`${className} animate-spin-once hover:animate-spin`} 
    fill="none" 
    style={{ transform: 'rotateY(-15deg) rotateX(5deg) perspective(100px)' }}
  >
    {/* Tree behind house */}
    <ellipse cx="18" cy="16" rx="2" ry="3" fill="#22c55e" opacity="0.8"/>
    <ellipse cx="17" cy="14" rx="1.5" ry="2" fill="#16a34a"/>
    
    {/* House body */}
    <rect x="4" y="12" width="12" height="8" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="0.5"/>
    
    {/* Roof */}
    <path d="M4 12 L10 6 L16 12 Z" fill="#6b7280" stroke="#4b5563" strokeWidth="0.5"/>
    
    {/* Red door */}
    <rect x="8" y="16" width="4" height="4" fill="#ef4444" stroke="#dc2626" strokeWidth="0.5"/>
    
    {/* Windows */}
    <rect x="6" y="13" width="2" height="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5"/>
    <rect x="12" y="13" width="2" height="2" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.5"/>
    
    {/* Door handle */}
    <circle cx="11" cy="18" r="0.3" fill="#1f2937"/>
  </svg>
);

// Custom 3D Service Bell Icon
const ServiceBellIcon = ({ className = "" }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={`${className} animate-spin-once hover:animate-spin`} 
    fill="none" 
    style={{ transform: 'rotateY(-10deg) rotateX(3deg) perspective(100px)' }}
  >
    {/* Bell body - chrome/metallic effect */}
    <ellipse cx="12" cy="10" rx="6" ry="7" fill="url(#bellGradient)" stroke="#374151" strokeWidth="0.5"/>
    
    {/* Bell top */}
    <rect x="10" y="3" width="4" height="2" rx="2" fill="#6b7280" stroke="#4b5563" strokeWidth="0.5"/>
    
    {/* Bell clapper */}
    <circle cx="12" cy="12" r="1" fill="#1f2937"/>
    <rect x="11.5" y="12" width="1" height="3" fill="#1f2937"/>
    <circle cx="12" cy="15" r="0.8" fill="#374151"/>
    
    {/* Metallic highlights */}
    <ellipse cx="10" cy="8" rx="1" ry="2" fill="white" opacity="0.3"/>
    <ellipse cx="14" cy="8" rx="1" ry="2" fill="white" opacity="0.2"/>
    
    {/* Gradient definitions */}
    <defs>
      <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#e5e7eb"/>
        <stop offset="50%" stopColor="#d1d5db"/>
        <stop offset="100%" stopColor="#9ca3af"/>
      </linearGradient>
    </defs>
  </svg>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const closeMenuAnd = (fn) => {
    setMenuOpen(false);
    fn?.();
  };

  return (
    <>
      <style jsx>{`
        @keyframes spin-once {
          from {
            transform: rotateY(-15deg) rotateX(5deg) rotate(0deg) perspective(100px);
          }
          to {
            transform: rotateY(-15deg) rotateX(5deg) rotate(360deg) perspective(100px);
          }
        }
        
        @keyframes spin-once-bell {
          from {
            transform: rotateY(-10deg) rotateX(3deg) rotate(0deg) perspective(100px);
          }
          to {
            transform: rotateY(-10deg) rotateX(3deg) rotate(360deg) perspective(100px);
          }
        }
        
        .animate-spin-once {
          animation: spin-once 1.5s ease-out forwards;
        }
        
        .animate-spin-once-bell {
          animation: spin-once-bell 1.5s ease-out forwards;
        }
        
        .hover\\:animate-spin:hover {
          animation: spin 1s linear infinite;
        }
      `}</style>
      
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <AirbnbLogo className="h-7 md:h-8" alt="Airbnb" />
          </div>

          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-900 group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-all duration-200 group-hover:scale-105">
                <HouseIcon className="w-6 h-6 animate-spin-once" />
              </div>
              <span>Homes</span>
            </li>
            <li className="flex items-center gap-3 cursor-pointer hover:text-gray-900 group">
              <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-all duration-200 group-hover:scale-105">
                <ServiceBellIcon className="w-6 h-6 animate-spin-once-bell" />
              </div>
              <span>Services</span>
            </li>
          </ul>

          <div className="relative">
            <button
              onClick={handleToggle}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:shadow transition"
              aria-label="User menu"
            >
              <AiOutlineUser size={20} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-20 py-2 text-sm text-gray-700 border">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => closeMenuAnd(() => navigate('/profile'))}
                >
                  Profile
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => closeMenuAnd(() => navigate('/login'))}
                >
                  Login
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Notifications</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Account Settings</button>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Wishlist</button>
                <hr className="my-2" />
                <div className="px-4 py-2">
                  <LogoutButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
