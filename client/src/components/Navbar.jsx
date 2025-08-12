import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiHome, HiCog } from "react-icons/hi";
import AirbnbLogo from "./AirbnbLogo";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const closeMenuAnd = (fn) => {
    setMenuOpen(false);
    fn?.();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <AirbnbLogo className="h-7 md:h-8" alt="Airbnb" />
        </div>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-900 group">
            <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-all duration-200">
              <HiHome size={20} className="text-gray-700 group-hover:text-gray-900" />
            </div>
            <span>Homes</span>
          </li>
          <li className="flex items-center gap-2 cursor-pointer hover:text-gray-900 group">
            <div className="p-2 rounded-lg group-hover:bg-gray-100 transition-all duration-200">
              <HiCog size={20} className="text-gray-700 group-hover:text-gray-900" />
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
  );
};

export default Navbar;
