import axios from "axios";
import { API_URL } from "../utils/apiConfig";

// ==========================================
// RESUME OTP API
// ==========================================

const RESUME_OTP_API_URL = `${API_URL}/api/resume-otp`;


// ==========================================
// SEND RESUME OTP
// ==========================================

export const sendResumeOTP = async (email) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${RESUME_OTP_API_URL}/send`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Send Resume OTP Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// ==========================================
// VERIFY RESUME OTP
// ==========================================

export const verifyResumeOTP = async (email, otp) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${RESUME_OTP_API_URL}/verify`,
      {
        email,
        otp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Verify Resume OTP Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// import axios from "axios";

// const API_URL = "http://localhost:8000/api/resume-otp";

// export const sendResumeOTP = async (email) => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API_URL}/send`,
//         { email },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };

// export const verifyResumeOTP = async (email, otp) => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API_URL}/verify`,
//         { email, otp },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };