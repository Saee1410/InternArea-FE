
import axios from "axios";
import { API_URL } from "../utils/apiConfig";

// ==========================================
// PREMIUM API
// ==========================================

const PREMIUM_API_URL = `${API_URL}/api/premium/check`;


// ==========================================
// CHECK PREMIUM STATUS
// ==========================================

export const checkPremium = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      PREMIUM_API_URL,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Check Premium Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};





// import axios from "axios";

// const API_URL = "http://localhost:8000/api/premium/check";

// export const checkPremium = async () => {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(
//         API_URL,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// }