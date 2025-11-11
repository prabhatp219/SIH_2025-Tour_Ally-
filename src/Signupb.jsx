import { useState } from "react";

function Signup() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API_URL = import.meta.env.VITE_API_URL; // your Vercel backend
      const response = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log(data); // see response
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
