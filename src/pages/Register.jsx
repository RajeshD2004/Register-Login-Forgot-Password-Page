import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCaptcha, registerUser } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [captchaData, setCaptchaData] = useState({ captcha: "", captcha_token: "" });
  const [formData, setFormData] = useState({
    bussiness_name: "",
    person_name: "",
    phone_number: "",
    email: "",
    password: "",
    terms_condition: false,
    captcha: "",
  });

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();
      setCaptchaData({ captcha: res.data.captcha, captcha_token: res.data.captcha_token });
    } catch (err) {
      console.error("Captcha error", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        bussiness_name: formData.bussiness_name,
        person_name: formData.person_name,
        phone_number: Number(formData.phone_number),
        email: formData.email,
        password: formData.password,
        terms_condition: formData.terms_condition,
        captcha: formData.captcha,
      };

      const res = await registerUser(payload, captchaData.captcha_token);
      alert(res.data.message);
      if(res.data.message !== "Registration failed") navigate('/');
    } catch (err) {
      console.error("Register error:", err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
      fetchCaptcha();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Register</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="bussiness_name"
            placeholder="Business Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="person_name"
            placeholder="Person Name"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="phone_number"
            placeholder="Phone Number"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center space-x-2">
            <strong className="text-gray-700">Captcha:</strong>
            <span className="bg-gray-200 px-3 py-1 rounded-md">{captchaData.captcha}</span>
          </div>

          <input
            name="captcha"
            placeholder="Enter Captcha"
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="terms_condition"
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-gray-700 text-sm">I agree to terms & conditions</span>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already registered? <Link to="/" className="text-blue-500 hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
