import axios from "axios";
import { API_URL } from "../utils/apiConfig";

// ==========================================
// PAYMENT API
// ==========================================

const PAYMENT_API_URL = `${API_URL}/api/payment`;


// ==========================================
// CREATE RESUME ORDER
// ==========================================

export const createResumeOrder = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${PAYMENT_API_URL}/create-order`,
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
      "Create Resume Order Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// ==========================================
// VERIFY RESUME PAYMENT
// ==========================================

export const verifyResumePayment = async (paymentData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${PAYMENT_API_URL}/verify`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Verify Resume Payment Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// import axios from "axios";

// const API = "http://localhost:8000/api/payment";

// export const createResumeOrder = async () => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API}/create-order`,
//         {},
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };

// export const verifyResumePayment = async (paymentData) => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API}/verify`,
//         paymentData,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };