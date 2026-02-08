import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [data, setData] = useState({
    user_name: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(data);
      console.log("Login Success:", res.data);

      // store token if available
      if (res.data.access_token) {
        localStorage.setItem("access_token", res.data.access_token);
      }

      alert("Login successful");
    } catch (err) {
      console.error(
        "Login Error:",
        err.response?.data || err.message
      );
      alert(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="user_name"
          placeholder="Email"
          value={data.user_name}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>

      <p>
        New user? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
