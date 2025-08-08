import { useState } from "react";
//import { FaBars } from 'react-icons/fa';
import { AiOutlineUser } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
import AirbnbLogo from "./AirbnbLogo";
import AuthPage from "../pages/AuthPage";
//import airbnbLogo from '../assets/airbnb-logo.png'; // add your logo here
import { useNavigate } from "react-router-dom";
import HostTypeModal from "./HostTypeModal";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setMenuOpen(!menuOpen);
  const handleHostSelect = (type) => {
    setShowModal(false);
    navigate(`/host/${type}`);
  };

  return (
    <nav className="w-full relative z-50 shadow-sm bg-white px-6 md:px-12 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <AirbnbLogo className="h-6 md:h-8" alt="Airbnb" />
      </div>

      <ul className="md:flex space-x-6 text-sm font-medium text-gray-600">
        <li className="cursor-pointer hover:text-black">Homes</li>
        <li className="cursor-pointer hover:text-black">Services</li>
      </ul>

      <div className="flex items-center space-x-4">
        <span className="md:inline text-sm font-semibold cursor-pointer hover:underline">
          <div
            onClick={() => setShowModal(true)}
            className="cursor-pointer transition"
          >
            Become a Host
          </div>
        </span>

        <div className="relative">
          <div
            onClick={handleToggle}
            className="w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer hover:shadow"
          >
            <AiOutlineUser size={20} />
          </div>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20 py-2 text-sm text-gray-700">
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <div
                  onClick={() => setShowModal(true)}
                  className="cursor-pointer transition"
                >
                  Become a Host
                </div>
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Notifications
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Account Settings
              </div>
              <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Wishlist
              </div>
              <hr className="my-1" />
              <div className="px-4 py-2 hover:bg-red-200 cursor-pointer hover:font-semibold font-medium text-red-500 flex items-center gap-2">
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <HostTypeModal
          onClose={() => setShowModal(false)}
          onSelect={handleHostSelect}
        />
      )}
    </nav>
  );
};

export default Navbar;
