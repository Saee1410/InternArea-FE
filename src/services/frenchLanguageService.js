import axios from "axios";
import { API_URL } from "../utils/apiConfig";

// ==========================================
// FRENCH LANGUAGE API
// ==========================================

const FRENCH_API_URL = `${API_URL}/api/french-language`;


// ==========================================
// SEND FRENCH LANGUAGE OTP
// ==========================================

export const sendFrenchOTP = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${FRENCH_API_URL}/send`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Send French OTP Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// ==========================================
// VERIFY FRENCH LANGUAGE OTP
// ==========================================

export const verifyFrenchOTP = async (otp) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${FRENCH_API_URL}/verify`,
      {
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
      "Verify French OTP Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};




// import axios from "axios";

// const API_URL = "http://localhost:8000/api/french-language";
// //const API_URL = "https://internarea-4g9n.onrender.com/api/french-language";

// // ==========================================
// // SEND FRENCH LANGUAGE OTP
// // ==========================================

// export const sendFrenchOTP = async () => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API_URL}/send`,
//         {},
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };


// // ==========================================
// // VERIFY FRENCH LANGUAGE OTP
// // ==========================================

// export const verifyFrenchOTP = async (otp) => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API_URL}/verify`,
//         {
//             otp,
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };
