import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCaptcha, registerUser } from "../api/authApi";

export default function Register() {

  const navigate = useNavigate();
  const [captchaData, setCaptchaData] = useState({
    captcha: "",
    captcha_token: "",
  });

  const [formData, setFormData] = useState({
    bussiness_name: "",
    person_name: "",
    phone_number: "",
    email: "",
    password: "",
    terms_condition: false,
    captcha: "",
  });

  /* -------- GET CAPTCHA ON PAGE LOAD -------- */
  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const res = await getCaptcha();
      setCaptchaData({
        captcha: res.data.captcha,
        captcha_token: res.data.captcha_token,
      });
    } catch (err) {
      console.error("Captcha error", err);
    }
  };

  /* -------- HANDLE INPUT -------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  /* -------- REGISTER SUBMIT -------- */
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

      const res = await registerUser(
        payload,
        captchaData.captcha_token
      );

      alert(res.data.message);
      if(res.data.message !== "Registration failed"){
           navigate('/');
      }
     

    } catch (err) {
      console.error("Register error:", err.response?.data);
      alert(err.response?.data?.message || "Registration failed");
      fetchCaptcha(); // refresh captcha on error
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="bussiness_name"
          placeholder="Business Name"
          onChange={handleChange}
          required
        />

        <input
          name="person_name"
          placeholder="Person Name"
          onChange={handleChange}
          required
        />

        <input
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {/* CAPTCHA */}
        <div>
          <strong>Captcha:</strong> {captchaData.captcha}
        </div>

        <input
          name="captcha"
          placeholder="Enter Captcha"
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="terms_condition"
            onChange={handleChange}
          />
          I agree to terms & conditions
        </label>

        <button type="submit">Register</button>
      </form>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
