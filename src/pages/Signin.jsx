import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signincss.css'; // reuse the same CSS for consistency

export default function Signin() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState(""); // For success/error messages
  const navigate=useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data sent:", form);

    try {
      const res = await axios.post("https://tourally-backend.vercel.app/api/signin", form);

      setMessage(res.data.message); // success message
      console.log(res.data.message);

      if (res.status === 200) {
        navigate("/"); // 
      }

      // Clear form fields after successful login
      setForm({
        email: "",
        password: ""
      });
    } catch (err) {
      // Show error message from backend
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

          <button type="submit" className="signup-btn">Sign In</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="login-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
