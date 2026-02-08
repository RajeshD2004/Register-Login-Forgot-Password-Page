import axios from "axios";

const API = axios.create({
  baseURL: "https://ecfilesolutions.com/ecgst",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;

export const getCaptcha = () => {
  return API.get("/user/captcha?captcha_type=easy");
};

/* REGISTER  */
export const registerUser = (data, captchaToken) => {
  return API.post("/user/register", data, {
    headers: {
      Authorization: `Bearer ${captchaToken}`,
    },
  });
};

/* LOGIN  */
export const loginUser = (data) => {
  return API.post("/user/login", data);
};

/*  FORGOT PASSWORD - SEND OTP */
export const sendForgotOtp = (email) => {
  return API.post(
    "/user/forgotreset?forgot_type=password&call_type=sendmail",
    { email }
  );
};

/*  FORGOT PASSWORD - CHANGE PASSWORD */
export const resetForgotPassword = (data) => {
  return API.post(
    "/user/forgotreset?forgot_type=password&call_type=changepassword",
    data
  );
};
