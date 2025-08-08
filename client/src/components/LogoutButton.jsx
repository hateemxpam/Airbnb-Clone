import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // OPTIONAL: Call backend if you track sessions
      // await axios.post('/auth/logout');

      // ✅ Clear all auth-related data from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      localStorage.removeItem("uploadedImageUrls"); // if you're storing temp image URLs

      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
