import { useState } from "react";
import SocialLoginButtons from "./SocialLoginButtons";
import axios from "../api/axios.js";
import HostTypeModal from "./HostTypeModal";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    //want to make 2 user one is user and other is host
    role: "", // default role
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleHostSelect = (type) => {
    setShowModal(false);
    navigate(`/host/${type}`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!form.phone.match(/^\d{11}$/))
      newErrors.phone = "Phone must be 11 digits";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!form.role) newErrors.role = "Role is required"; // Ensure role is selected
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      const res = await axios.post("/auth/signup", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
        role: form.role,
      });

      console.log("Signup response:", res.data);
      alert("✅ Signup successful! You can now log in.");
      navigate("/login");

      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      // if (form.role === 'host') {
      //   navigate('/host/dashboard');
      // } else {
      //   navigate('/');
      // }
    } catch (error) {
      console.error("Signup error:", error);

      if (error.response) {
        console.log("Response data:", error.response.data);
        alert(
          `❌ ${error.response.data.message || "Signup failed from backend"}`,
        );
      } else if (error.request) {
        console.log("No response received:", error.request);
        alert("❌ No response from server. Check if backend is running.");
      } else {
        console.log("Error setting up request:", error.message);
        alert("❌ Request setup failed");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-transparent"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <div className="flex items-center space-x-6 my-2">
          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.role === "user"}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-red-500 focus:ring-red-400"
            />
            <label className="text-gray-700">User</label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              name="role"
              value="host"
              checked={form.role === "host"}
              onChange={handleChange}
              className="mr-2 h-4 w-4 text-red-500 focus:ring-red-400"
            />
            <label className="text-gray-700">Host</label>
          </div>
        </div>
        {errors.role && (
          <p className="mt-1 text-xs text-red-500">{errors.role}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400 transition-colors duration-200"
      >
        Sign Up
      </button>

      <div className="text-center text-sm text-gray-500">or sign up with</div>
      <SocialLoginButtons />

      {showModal && (
        <HostTypeModal
          onClose={() => setShowModal(false)}
          onSelect={handleHostSelect}
        />
      )}
    </form>
  );
};

export default SignUpForm;
