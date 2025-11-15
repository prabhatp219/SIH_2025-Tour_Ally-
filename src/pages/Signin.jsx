import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signincss.css"; // reuse the same CSS for consistency
import api from "../api";

export default function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/signin", form);

      // Save message
      setMessage(res.data.message);

      // Save token ALWAYS if it exists
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Redirect
      navigate("/");

      // Clear fields
      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage(err.response?.data?.message || "Signin failed. Try again.");
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>Login to your account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">
            Sign In
          </button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="login-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
