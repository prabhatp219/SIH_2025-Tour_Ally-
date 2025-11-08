import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signupcss.css';

  export default function Signup() {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: ""
    });

  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data sent:", form); 
    console.log("`187")
    try {
      console.log("142");
      const res = await axios.post("http://localhost:3000/api/signup", form);
      // const res = await axios.post("https://smarttouristsafety.onrender.com/api/auth/signup", form);
      console.log("12892");
      // Show success message
      setMessage(res.data.message);
      console.log(res.data.message);
      // Clear form fields
      // ✅ Navigate to home if signup is successful
if (res.status === 201) {
  navigate("/");
}

      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
      });
    } catch (err) {
      // Show error message from backend
      setMessage(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2>Register with:</h2>
        <div className="social-buttons">
          <button className="google-btn" type="button">Google</button>
          {/* <button className="github-btn" type="button">Github</button> */}
          {/* <button className="gitlab-btn" type="button">Gitlab</button> */}
        </div>
        <div className="or">Or</div>

        <form onSubmit={handleSubmit}>
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

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

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="terms">
          By creating an account, you agree to the <a href="#">Terms of Service</a>. We'll occasionally send you account-related emails.
        </p>

        <p className="login-link">
          Already have an account? <a href="/signin">Sign In</a>
        </p>
      </div>
    </div>
  );
}
