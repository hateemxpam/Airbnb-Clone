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
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.password && (
        <p className="text-sm text-red-500">{errors.password}</p>
      )}

      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md"
      />
      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
      )}

      <input
        type="radio"
        name="role"
        value="user"
        checked={form.role === "user"}
        onChange={handleChange}
        className="mr-2"
      />
      <label className="mr-4">User</label>

      <input
        type="radio"
        name="role"
        value="host"
        checked={form.role === "host"}
        onChange={handleChange}
        className="mr-2"
      />
      <label>Host</label>

      <button
        type="submit"
        className="w-full py-2 bg-coral text-red font-semibold rounded-md bg-red-500 hover:bg-red-400"
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
