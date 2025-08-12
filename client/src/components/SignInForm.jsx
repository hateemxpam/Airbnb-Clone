import { useState } from "react";
import SocialLoginButtons from "./SocialLoginButtons";
import AirbnbLogo from "./AirbnbLogo";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email) {
      setError("Please enter Email. ");
      return;
    } else if (!form.password) {
      setError("Please enter Password.");
      return;
    }

    try {
      const res = await axios.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { token, userdata } = res.data;

      if (!token || !userdata) {
        setError("Unexpected response from server.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userdata.userId);
      localStorage.setItem("userRole", userdata.userRole);
      localStorage.setItem("userName", userdata.userName);

      alert("✅ Login successful!");

      if (userdata.userRole === "host") {
        navigate("/host/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-full mx-auto">
      {error && <div className="text-red-600 text-sm">{error}</div>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2 border rounded-md"
      />

      <button
        type="submit"
        className="w-full py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-400"
      >
        Sign In
      </button>

      <div className="text-center text-sm text-gray-500">or sign in with</div>
      <SocialLoginButtons />
    </form>
  );
};

export default SignInForm;
