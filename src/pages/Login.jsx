// import { useRef, useState } from "react";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   Tabs,
//   Tab,
//   Checkbox,
//   FormControlLabel,
//   Link,
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
//   Email,
//   Lock,
// } from "@mui/icons-material";

// import { GoogleLogin } from "@react-oauth/google";

// import {
//   useNavigate,
//   Link as RouterLink,
// } from "react-router-dom";

// import { useTranslation } from "react-i18next";

// import { API_URL } from "../utils/apiConfig";

// import logo2 from "../assets/logo2.jpg";


// function Login() {

//   const navigate = useNavigate();

//   const { t } = useTranslation();


//   // =====================================================
//   // STATES
//   // =====================================================

//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   const [remember, setRemember] = useState(false);

//   const [loginType, setLoginType] = useState("student");


//   // =====================================================
//   // LOGIN FORM
//   // =====================================================

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });


//   // =====================================================
//   // OTP STATES
//   // =====================================================

//   const [showOTP, setShowOTP] = useState(false);

//   const [otp, setOtp] = useState("");

//   const [otpUserId, setOtpUserId] = useState(null);

//   const [otpEmail, setOtpEmail] = useState("");


//   // =====================================================
//   // GOOGLE LOGIN DUPLICATE PROTECTION
//   // =====================================================

//   const googleLoginInProgress = useRef(false);


//   // =====================================================
//   // HANDLE INPUT CHANGE
//   // =====================================================

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//   };


//   // =====================================================
//   // GOOGLE LOGIN
//   // =====================================================

//   const handleGoogleLogin = async (response) => {

//     // -----------------------------------------------
//     // Prevent duplicate Google callback
//     // -----------------------------------------------

//     if (googleLoginInProgress.current) {

//       console.log(
//         "⚠️ Google login already in progress"
//       );

//       return;
//     }


//     // -----------------------------------------------
//     // Check credential
//     // -----------------------------------------------

//     if (!response?.credential) {

//       console.error(
//         "❌ Google credential not received"
//       );

//       alert(
//         t("login.googleLoginFailed") ||
//         "Google login failed"
//       );

//       return;
//     }


//     try {

//       googleLoginInProgress.current = true;

//       setLoading(true);


//       console.log(
//         "=========================================="
//       );

//       console.log(
//         "🔥 GOOGLE LOGIN STARTED"
//       );

//       console.log(
//         "Credential received:",
//         !!response.credential
//       );

//       console.log(
//         "API URL:",
//         API_URL
//       );

//       console.log(
//         "=========================================="
//       );


//       // -----------------------------------------------
//       // Send Google credential to backend
//       // -----------------------------------------------

//       const res = await axios.post(
//         `${API_URL}/api/auth/google`,
//         {
//           credential: response.credential,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );


//       console.log(
//         "✅ Google backend response:",
//         res.data
//       );


//       // =================================================
//       // OTP REQUIRED
//       // =================================================

//       if (res.data?.requiresOTP) {

//         console.log(
//           "🔐 Google login requires OTP"
//         );


//         // Validate backend response
//         if (!res.data.userId) {

//           console.error(
//             "❌ Backend did not return userId"
//           );

//           alert(
//             "OTP verification could not start. User ID missing."
//           );

//           return;
//         }


//         if (!res.data.email) {

//           console.error(
//             "❌ Backend did not return email"
//           );

//           alert(
//             "OTP verification could not start. Email missing."
//           );

//           return;
//         }


//         console.log(
//           "👤 OTP User ID:",
//           res.data.userId
//         );

//         console.log(
//           "📧 OTP Email:",
//           res.data.email
//         );


//         // -----------------------------------------------
//         // Save OTP information
//         // -----------------------------------------------

//         setOtpUserId(res.data.userId);

//         setOtpEmail(res.data.email);

//         setOtp("");

//         setShowOTP(true);


//         console.log(
//           "✅ OTP screen opened"
//         );


//         return;
//       }


//       // =================================================
//       // NORMAL GOOGLE LOGIN
//       // =================================================

//       if (!res.data?.token || !res.data?.user) {

//         console.error(
//           "❌ Invalid Google login response",
//           res.data
//         );

//         alert(
//           "Invalid response received from server."
//         );

//         return;
//       }


//       const user = res.data.user;


//       console.log(
//         "👤 Google user:",
//         user
//       );


//       // -----------------------------------------------
//       // Save login data
//       // -----------------------------------------------

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );


//       // -----------------------------------------------
//       // Redirect
//       // -----------------------------------------------

//       if (user.role === "admin") {

//         navigate("/admin/dashboard");

//       } else {

//         navigate("/");

//       }


//     } catch (error) {

//       console.error(
//         "❌ GOOGLE LOGIN ERROR:",
//         error
//       );


//       console.error(
//         "❌ Backend response:",
//         error.response?.data
//       );


//       console.error(
//         "❌ HTTP status:",
//         error.response?.status
//       );


//       console.error(
//         "❌ Error message:",
//         error.message
//       );


//       alert(
//         error.response?.data?.message ||
//         t("login.googleLoginFailed") ||
//         "Google login failed"
//       );


//     } finally {

//       setLoading(false);

//       googleLoginInProgress.current = false;

//     }

//   };


//   // =====================================================
//   // NORMAL EMAIL/PASSWORD LOGIN
//   // =====================================================

//   const handleSubmit = async (e) => {

//     e.preventDefault();


//     if (loading) {
//       return;
//     }


//     // -----------------------------------------------
//     // Basic validation
//     // -----------------------------------------------

//     if (!formData.email.trim()) {

//       alert(
//         t("login.emailRequired") ||
//         "Please enter your email"
//       );

//       return;
//     }


//     if (!formData.password) {

//       alert(
//         t("login.passwordRequired") ||
//         "Please enter your password"
//       );

//       return;
//     }


//     try {

//       setLoading(true);


//       console.log(
//         "📤 Normal login request..."
//       );


//       const res = await axios.post(
//         `${API_URL}/api/auth/login`,
//         {
//           email: formData.email.trim(),
//           password: formData.password,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );


//       console.log(
//         "✅ Normal login response:",
//         res.data
//       );


//       // =================================================
//       // OTP REQUIRED
//       // =================================================

//       if (res.data?.requiresOTP) {

//         console.log(
//           "🔐 Normal login requires OTP"
//         );


//         if (!res.data.userId) {

//           alert(
//             "OTP verification could not start. User ID missing."
//           );

//           return;
//         }


//         setOtpUserId(res.data.userId);

//         setOtpEmail(
//           res.data.email || formData.email
//         );

//         setOtp("");

//         setShowOTP(true);


//         return;
//       }


//       // =================================================
//       // NORMAL LOGIN SUCCESS
//       // =================================================

//       if (!res.data?.token || !res.data?.user) {

//         alert(
//           "Invalid response received from server."
//         );

//         return;
//       }


//       const user = res.data.user;


//       // -----------------------------------------------
//       // Student/Admin validation
//       // -----------------------------------------------

//       if (
//         loginType === "admin" &&
//         user.role !== "admin"
//       ) {

//         alert(
//           t("login.studentOption") ||
//           "This account is not an admin account."
//         );

//         return;
//       }


//       if (
//         loginType === "student" &&
//         user.role === "admin"
//       ) {

//         alert(
//           t("login.adminOption") ||
//           "Please use Admin Login."
//         );

//         return;
//       }


//       // -----------------------------------------------
//       // Save user
//       // -----------------------------------------------

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );


//       // -----------------------------------------------
//       // Redirect
//       // -----------------------------------------------

//       if (user.role === "admin") {

//         navigate("/admin/dashboard");

//       } else {

//         navigate("/");

//       }


//     } catch (error) {

//       console.error(
//         "❌ NORMAL LOGIN ERROR:",
//         error
//       );


//       console.error(
//         "❌ Backend response:",
//         error.response?.data
//       );


//       alert(
//         error.response?.data?.message ||
//         t("login.loginFailed") ||
//         "Login failed"
//       );


//     } finally {

//       setLoading(false);

//     }

//   };


//   // =====================================================
//   // VERIFY LOGIN OTP
//   // =====================================================

//   const handleVerifyOTP = async () => {

//     // -----------------------------------------------
//     // Validate OTP
//     // -----------------------------------------------

//     if (!otpUserId) {

//       alert(
//         "User information is missing. Please login again."
//       );

//       return;
//     }


//     if (!otp || otp.length !== 6) {

//       alert(
//         t("login.enterOTP") ||
//         "Please enter a valid 6 digit OTP"
//       );

//       return;
//     }


//     if (loading) {
//       return;
//     }


//     try {

//       setLoading(true);


//       console.log(
//         "=========================================="
//       );

//       console.log(
//         "🔐 VERIFYING LOGIN OTP"
//       );

//       console.log(
//         "👤 User ID:",
//         otpUserId
//       );

//       console.log(
//         "🔢 OTP length:",
//         otp.length
//       );

//       console.log(
//         "=========================================="
//       );


//       const res = await axios.post(
//         `${API_URL}/api/auth/verify-login-otp`,
//         {
//           userId: otpUserId,
//           otp: otp,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );


//       console.log(
//         "✅ OTP verification response:",
//         res.data
//       );


//       // =================================================
//       // CHECK RESPONSE
//       // =================================================

//       if (!res.data?.token || !res.data?.user) {

//         alert(
//           "Invalid response received from server."
//         );

//         return;
//       }


//       const user = res.data.user;


//       // =================================================
//       // STUDENT / ADMIN VALIDATION
//       // =================================================

//       if (
//         loginType === "admin" &&
//         user.role !== "admin"
//       ) {

//         alert(
//           t("login.studentOption") ||
//           "This account is not an admin account."
//         );

//         return;
//       }


//       if (
//         loginType === "student" &&
//         user.role === "admin"
//       ) {

//         alert(
//           t("login.adminOption") ||
//           "Please use Admin Login."
//         );

//         return;
//       }


//       // =================================================
//       // SAVE LOGIN
//       // =================================================

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );


//       console.log(
//         "✅ LOGIN SUCCESSFUL"
//       );


//       // =================================================
//       // REDIRECT
//       // =================================================

//       if (user.role === "admin") {

//         navigate("/admin/dashboard");

//       } else {

//         navigate("/");

//       }


//     } catch (error) {

//       console.error(
//         "❌ OTP VERIFICATION ERROR:",
//         error
//       );


//       console.error(
//         "❌ Backend response:",
//         error.response?.data
//       );


//       console.error(
//         "❌ HTTP status:",
//         error.response?.status
//       );


//       alert(
//         error.response?.data?.message ||
//         "Invalid or expired OTP"
//       );


//     } finally {

//       setLoading(false);

//     }

//   };


//   // =====================================================
//   // BACK TO LOGIN
//   // =====================================================

//   const handleBackToLogin = () => {

//     setShowOTP(false);

//     setOtp("");

//     setOtpUserId(null);

//     setOtpEmail("");

//     setLoading(false);

//   };


//   // =====================================================
//   // OTP SCREEN
//   // =====================================================

//   if (showOTP) {

//     return (

//       <Box
//         sx={{
//           minHeight: "100vh",

//           display: "flex",

//           alignItems: "center",

//           justifyContent: "center",

//           backgroundImage: `linear-gradient(
//             rgba(255,255,255,0.75),
//             rgba(255,255,255,0.75)
//           ),url(${logo2})`,

//           backgroundSize: "cover",

//           backgroundPosition: "center",

//           p: 3,
//         }}
//       >

//         <Paper
//           elevation={8}
//           sx={{
//             width: "100%",

//             maxWidth: 520,

//             p: 5,

//             borderRadius: 5,

//             backdropFilter: "blur(10px)",
//           }}
//         >

//           {/* ==========================================
//               LOGO
//           ========================================== */}

//           <Box
//             textAlign="center"
//           >

//             <Box
//               component="img"

//               src={logo2}

//               sx={{
//                 width: 90,

//                 height: 90,

//                 borderRadius: "50%",

//                 objectFit: "cover",

//                 mb: 2,
//               }}
//             />


//             <Typography
//               variant="h4"
//               fontWeight="bold"
//             >
//               Verify Login
//             </Typography>


//             <Typography
//               color="text.secondary"
//               mt={1}
//             >
//               OTP has been sent to
//             </Typography>


//             <Typography
//               fontWeight="bold"
//               mt={1}
//             >
//               {otpEmail}
//             </Typography>

//           </Box>


//           {/* ==========================================
//               OTP FORM
//           ========================================== */}

//           <Box
//             sx={{
//               mt: 4,

//               display: "flex",

//               flexDirection: "column",

//               gap: 3,
//             }}
//           >

//             <TextField
//               label="Enter 6 Digit OTP"

//               value={otp}

//               onChange={(e) => {

//                 const value =
//                   e.target.value
//                     .replace(/\D/g, "")
//                     .slice(0, 6);

//                 setOtp(value);

//               }}

//               fullWidth

//               autoFocus

//               inputProps={{
//                 maxLength: 6,

//                 inputMode: "numeric",

//                 autoComplete: "one-time-code",
//               }}
//             />


//             <Button
//               variant="contained"

//               size="large"

//               disabled={
//                 loading ||
//                 otp.length !== 6
//               }

//               onClick={handleVerifyOTP}

//               sx={{
//                 py: 1.5,

//                 borderRadius: 2,

//                 background: "#008BDC",

//                 fontSize: 18,

//                 "&:hover": {
//                   background: "#0075b8",
//                 },
//               }}
//             >

//               {loading
//                 ? "Verifying..."
//                 : "Verify OTP"}

//             </Button>


//             <Button
//               variant="text"

//               disabled={loading}

//               onClick={handleBackToLogin}
//             >
//               Back to Login
//             </Button>

//           </Box>

//         </Paper>

//       </Box>

//     );

//   }


//   // =====================================================
//   // MAIN LOGIN SCREEN
//   // =====================================================

//   return (

//     <Box
//       sx={{
//         minHeight: "100vh",

//         display: "flex",

//         alignItems: "center",

//         justifyContent: "center",

//         backgroundImage: `linear-gradient(
//           rgba(255,255,255,0.75),
//           rgba(255,255,255,0.75)
//         ),url(${logo2})`,

//         backgroundSize: "cover",

//         backgroundPosition: "center",

//         p: 3,
//       }}
//     >

//       <Paper
//         elevation={8}

//         sx={{
//           width: "100%",

//           maxWidth: 520,

//           p: 5,

//           borderRadius: 5,

//           backdropFilter: "blur(10px)",
//         }}
//       >

//         {/* ==========================================
//             LOGO + TITLE
//         ========================================== */}

//         <Box textAlign="center">

//           <Box
//             component="img"

//             src={logo2}

//             sx={{
//               width: 90,

//               height: 90,

//               borderRadius: "50%",

//               objectFit: "cover",

//               mb: 2,
//             }}
//           />


//           <Typography
//             variant="h4"
//             fontWeight="bold"
//           >
//             {t("login.title")}
//           </Typography>


//           <Typography
//             color="text.secondary"
//             mt={1}
//           >
//             {t("login.subtitle")}
//           </Typography>

//         </Box>


//         {/* ==========================================
//             STUDENT / ADMIN TABS
//         ========================================== */}

//         <Tabs
//           value={loginType}

//           onChange={(e, value) => {

//             setLoginType(value);

//           }}

//           variant="fullWidth"

//           sx={{
//             mt: 4,

//             background: "#f3f4f6",

//             borderRadius: 2,
//           }}
//         >

//           <Tab
//             value="student"
//             label={t("login.student")}
//           />

//           <Tab
//             value="admin"
//             label={t("login.admin")}
//           />

//         </Tabs>


//         {/* ==========================================
//             LOGIN FORM
//         ========================================== */}

//         <Box
//           component="form"

//           onSubmit={handleSubmit}

//           sx={{
//             mt: 4,

//             display: "flex",

//             flexDirection: "column",

//             gap: 3,
//           }}
//         >

//           {/* EMAIL */}

//           <TextField

//             label={t("login.email")}

//             name="email"

//             value={formData.email}

//             onChange={handleChange}

//             fullWidth

//             type="email"

//             autoComplete="email"

//             InputProps={{

//               startAdornment: (

//                 <InputAdornment position="start">

//                   <Email color="primary" />

//                 </InputAdornment>

//               ),

//             }}

//           />


//           {/* PASSWORD */}

//           <TextField

//             label={t("login.password")}

//             name="password"

//             type={
//               showPassword
//                 ? "text"
//                 : "password"
//             }

//             value={formData.password}

//             onChange={handleChange}

//             fullWidth

//             autoComplete="current-password"

//             InputProps={{

//               startAdornment: (

//                 <InputAdornment position="start">

//                   <Lock color="primary" />

//                 </InputAdornment>

//               ),

//               endAdornment: (

//                 <IconButton

//                   onClick={() =>
//                     setShowPassword(
//                       !showPassword
//                     )
//                   }

//                   edge="end"
//                 >

//                   {showPassword

//                     ? <VisibilityOff />

//                     : <Visibility />

//                   }

//                 </IconButton>

//               ),

//             }}

//           />


//           {/* REMEMBER + FORGOT */}

//           <Box
//             display="flex"

//             justifyContent="space-between"

//             alignItems="center"
//           >

//             <FormControlLabel

//               control={

//                 <Checkbox

//                   checked={remember}

//                   onChange={() =>
//                     setRemember(!remember)
//                   }

//                 />

//               }

//               label={
//                 t("login.rememberMe")
//               }

//             />


//             <Link

//               component={RouterLink}

//               to="/forgot"

//               underline="hover"

//             >

//               {
//                 t("login.forgotPassword")
//               }

//             </Link>

//           </Box>


//           {/* LOGIN BUTTON */}

//           <Button

//             type="submit"

//             variant="contained"

//             size="large"

//             disabled={loading}

//             sx={{

//               py: 1.5,

//               borderRadius: 2,

//               background: "#008BDC",

//               fontSize: 18,

//               "&:hover": {
//                 background: "#0075b8",
//               },

//             }}

//           >

//             {loading

//               ? t("login.loggingIn")

//               : t("login.loginButton")

//             }

//           </Button>

//         </Box>


//         {/* ==========================================
//             OR
//         ========================================== */}

//         <Typography

//           textAlign="center"

//           my={3}

//           color="text.secondary"

//         >

//           {t("login.or")}

//         </Typography>


//         {/* ==========================================
//             GOOGLE LOGIN
//         ========================================== */}

//         <Box

//           display="flex"

//           justifyContent="center"

//           sx={{
//             pointerEvents:
//               loading
//                 ? "none"
//                 : "auto",
//           }}

//         >

//           <GoogleLogin

//             onSuccess={handleGoogleLogin}

//             onError={() => {

//               console.error(
//                 "❌ Google popup/login failed"
//               );

//               alert(
//                 t("login.googleLoginFailed") ||
//                 "Google login failed"
//               );

//             }}

//           />

//         </Box>


//         {/* ==========================================
//             REGISTER
//         ========================================== */}

//         <Typography

//           textAlign="center"

//           mt={3}

//         >

//           {t("login.noAccount")}{" "}


//           <Link

//             component={RouterLink}

//             to="/register"

//             underline="hover"

//           >

//             {t("login.register")}

//           </Link>

//         </Typography>

//       </Paper>

//     </Box>

//   );

// }


// export default Login;



// import { useState } from "react";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   Tabs,
//   Tab,
//   Checkbox,
//   FormControlLabel,
//   Link
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
//   Email,
//   Lock
// } from "@mui/icons-material";

// import { GoogleLogin } from "@react-oauth/google";

// import { useNavigate, Link as RouterLink } from "react-router-dom";

// import { useTranslation } from "react-i18next";

// import { API_URL } from "../utils/apiConfig";

// import logo2 from "../assets/logo2.jpg";


// function Login() {

//   const navigate = useNavigate();

//   const { t } = useTranslation();

//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   const [remember, setRemember] = useState(false);

//   const [loginType, setLoginType] = useState("student");


//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [showOTP, setShowOTP] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpUserId, setOtpUserId] = useState(null);
//   const [otpEmail, setOtpEmail] = useState("");




//   const handleChange = (e) => {

//     setFormData({

//       ...formData,

//       [e.target.name]: e.target.value

//     });

//   };

//   const handleGoogleLogin = async (response) => {
//   try {
//     // Prevent multiple Google login requests
//     if (loading) {
//       console.log("⚠️ Google login already in progress");
//       return;
//     }

//     setLoading(true);

//     console.log("🔥 GOOGLE LOGIN CLICKED");

//     console.log(
//       "Credential received:",
//       !!response?.credential
//     );

//     console.log(
//       "API URL:",
//       API_URL
//     );

//     if (!response?.credential) {
//       console.log(
//         "❌ Google credential not received"
//       );
//       return;
//     }

//     console.log(
//       "📤 Sending Google login request..."
//     );

//     const res = await axios.post(
//       `${API_URL}/api/auth/google`,
//       {
//         credential: response.credential
//       }
//     );

//     console.log(
//       "✅ Backend response:",
//       res.data
//     );

//     // =====================================================
//     // OTP REQUIRED
//     // =====================================================

//     if (res.data.requiresOTP) {

//       console.log(
//         "🔐 OTP verification required"
//       );

//       console.log(
//         "👤 OTP User ID:",
//         res.data.userId
//       );

//       setOtpUserId(res.data.userId);

//       setOtpEmail(res.data.email);

//       // Clear previous OTP
//       setOtp("");

//       setShowOTP(true);

//       return;
//     }

//     // =====================================================
//     // NORMAL LOGIN
//     // =====================================================

//     const user = res.data.user;

//     console.log(
//       "👤 Logged in user:",
//       user
//     );

//     localStorage.setItem(
//       "token",
//       res.data.token
//     );

//     localStorage.setItem(
//       "user",
//       JSON.stringify(user)
//     );

//     if (user.role === "admin") {
//       navigate("/admin/dashboard");
//     } else {
//       navigate("/");
//     }

//   } catch (err) {

//     console.error(
//       "❌ GOOGLE LOGIN FRONTEND ERROR:",
//       err
//     );

//     console.error(
//       "❌ Backend Response:",
//       err.response?.data
//     );

//     console.error(
//       "❌ HTTP Status:",
//       err.response?.status
//     );

//     console.error(
//       "❌ Error Message:",
//       err.message
//     );

//     alert(
//       err.response?.data?.message ||
//       t("login.googleLoginFailed")
//     );

//   } finally {

//     setLoading(false);

//   }
// };

// //   const handleGoogleLogin = async (response) => {

// //   try {

// //     console.log("🔥 GOOGLE LOGIN CLICKED");

// //     console.log(
// //       "Credential received:",
// //       !!response?.credential
// //     );

// //     console.log(
// //       "API URL:",
// //       API_URL
// //     );


// //     if (!response?.credential) {

// //       console.log(
// //         "❌ Google credential not received"
// //       );

// //       return;

// //     }


// //     console.log(
// //       "📤 Sending Google login request..."
// //     );


// //     const res = await axios.post(
// //       `${API_URL}/api/auth/google`,
// //       {
// //         credential: response.credential
// //       }
// //     );


// //     console.log(
// //       "✅ Backend response:",
// //       res.data
// //     );


// //     // =====================================================
// //     // OTP REQUIRED
// //     // =====================================================

// //     if (res.data.requiresOTP) {

// //       console.log(
// //         "🔐 OTP verification required"
// //       );


// //       setOtpUserId(
// //         res.data.userId
// //       );


// //       setOtpEmail(
// //         res.data.email
// //       );


// //       setShowOTP(true);


// //       return;

// //     }


// //     // =====================================================
// //     // NORMAL LOGIN
// //     // =====================================================

// //     const user =
// //       res.data.user;


// //     console.log(
// //       "👤 Logged in user:",
// //       user
// //     );


// //     localStorage.setItem(
// //       "token",
// //       res.data.token
// //     );


// //     localStorage.setItem(
// //       "user",
// //       JSON.stringify(user)
// //     );


// //     if (user.role === "admin") {

// //       navigate(
// //         "/admin/dashboard"
// //       );

// //     } else {

// //       navigate("/");

// //     }


// //   }

// //   catch (err) {

// //     console.error(
// //       "❌ GOOGLE LOGIN FRONTEND ERROR:",
// //       err
// //     );


// //     console.error(
// //       "❌ Backend Response:",
// //       err.response?.data
// //     );


// //     console.error(
// //       "❌ HTTP Status:",
// //       err.response?.status
// //     );


// //     console.error(
// //       "❌ Error Message:",
// //       err.message
// //     );


// //     alert(
// //       err.response?.data?.message ||
// //       t("login.googleLoginFailed")
// //     );

// //   }

// // };



//   // const handleGoogleLogin = async (response) => {

//   //   try {

//   //     const res = await axios.post(
//   //       `${API_URL}/api/auth/google`,
//   //       {
//   //         credential: response.credential
//   //       }
//   //     );

//   //     if (res.data.requiresOTP) {

//   //       setOtpUserId(res.data.userId);
//   //       setOtpEmail(res.data.email);
//   //       setShowOTP(true);

//   //       return;
//   //     }

//   //     const user = res.data.user;

//   //     localStorage.setItem(
//   //       "token",
//   //       res.data.token
//   //     );

//   //     localStorage.setItem(
//   //       "user",
//   //       JSON.stringify(user)
//   //     );

//   //     if (user.role === "admin") {

//   //       navigate("/admin/dashboard");

//   //     } else {

//   //       navigate("/");

//   //     }

//   //   }
//   //   catch (err) {

//   //     console.log(err);

//   //     alert(
//   //       err.response?.data?.message ||
//   //       t("login.googleLoginFailed")
//   //     );

//   //   }

//   // };


//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       const res = await axios.post(
//         `${API_URL}/api/auth/login`,
//         formData
//       );

//       if (res.data.requiresOTP) {

//         setOtpUserId(res.data.userId);
//         setOtpEmail(res.data.email);
//         setShowOTP(true);

//         return;
//       }

//       const user = res.data.user;


//       localStorage.setItem(
//         "token",
//         res.data.token
//       );


//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );


//       if (loginType === "admin" && user.role !== "admin") {

//         alert(t("login.studentOption"));

//         return;

//       }


//       if (loginType === "student" && user.role === "admin") {

//         alert(t("login.adminOption"));

//         return;

//       }


//       if (user.role === "admin") {

//         navigate("/admin/dashboard");

//       }
//       else {

//         navigate("/");

//       }

//     }

//     catch (error) {

//       alert(
//         error.response?.data?.message ||
//         t("login.loginFailed")
//       );

//     }

//     finally {

//       setLoading(false);

//     }

//   };


//   const handleVerifyOTP = async () => {

//     if (!otp) {

//       alert(
//         t("login.enterOTP") ||
//         "Please enter OTP"
//       );

//       return;

//     }

//     try {

//       setLoading(true);

//       const res = await axios.post(
//         `${API_URL}/api/auth/verify-login-otp`,
//         {
//           userId: otpUserId,
//           otp: otp
//         }
//       );

//       const user = res.data.user;

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );


//       if (loginType === "admin" && user.role !== "admin") {

//         alert(t("login.studentOption"));

//         return;

//       }


//       if (loginType === "student" && user.role === "admin") {

//         alert(t("login.adminOption"));

//         return;

//       }


//       if (user.role === "admin") {

//         navigate("/admin/dashboard");

//       }
//       else {

//         navigate("/");

//       }

//     }
//     catch (error) {

//       alert(
//         error.response?.data?.message ||
//         "Invalid OTP"
//       );

//     }
//     finally {

//       setLoading(false);

//     }

//   };


//   if (showOTP) {

//     return (

//       <Box

//         sx={{

//           minHeight: "100vh",

//           display: "flex",

//           alignItems: "center",

//           justifyContent: "center",

//           backgroundImage: `linear-gradient(
//             rgba(255,255,255,0.75),
//             rgba(255,255,255,0.75)
//           ),url(${logo2})`,

//           backgroundSize: "cover",

//           backgroundPosition: "center",

//           p: 3

//         }}

//       >


//         <Paper

//           elevation={8}

//           sx={{

//             width: "100%",

//             maxWidth: 520,

//             p: 5,

//             borderRadius: 5,

//             backdropFilter: "blur(10px)"

//           }}

//         >


//           <Box textAlign="center">


//             <Box

//               component="img"

//               src={logo2}

//               sx={{

//                 width: 90,

//                 height: 90,

//                 borderRadius: "50%",

//                 objectFit: "cover",

//                 mb: 2

//               }}

//             />


//             <Typography

//               variant="h4"

//               fontWeight="bold"

//             >

//               Verify Login

//             </Typography>


//             <Typography

//               color="text.secondary"

//               mt={1}

//             >

//               OTP has been sent to

//             </Typography>


//             <Typography

//               fontWeight="bold"

//               mt={1}

//             >

//               {otpEmail}

//             </Typography>


//           </Box>


//           <Box

//             sx={{

//               mt: 4,

//               display: "flex",

//               flexDirection: "column",

//               gap: 3

//             }}

//           >


//             <TextField

//               label="Enter 6 Digit OTP"

//               value={otp}

//               onChange={(e) => {

//                 const value = e.target.value.replace(
//                   /\D/g,
//                   ""
//                 );

//                 setOtp(value);

//               }}

//               fullWidth

//               inputProps={{

//                 maxLength: 6

//               }}

//             />


//             <Button

//               variant="contained"

//               size="large"

//               disabled={loading}

//               onClick={handleVerifyOTP}

//               sx={{

//                 py: 1.5,

//                 borderRadius: 2,

//                 background: "#008BDC",

//                 fontSize: 18

//               }}

//             >

//               {

//                 loading

//                   ?

//                   "Verifying..."

//                   :

//                   "Verify OTP"

//               }

//             </Button>


//             <Button

//               variant="text"

//               onClick={() => {

//                 setShowOTP(false);

//                 setOtp("");

//                 setOtpUserId(null);

//                 setOtpEmail("");

//               }}

//             >

//               Back to Login

//             </Button>


//           </Box>


//         </Paper>


//       </Box>

//     );

//   }


//   return (

//     <Box

//       sx={{

//         minHeight: "100vh",

//         display: "flex",

//         alignItems: "center",

//         justifyContent: "center",

//         backgroundImage: `linear-gradient(
//           rgba(255,255,255,0.75),
//           rgba(255,255,255,0.75)
//         ),url(${logo2})`,

//         backgroundSize: "cover",

//         backgroundPosition: "center",

//         p: 3

//       }}

//     >


//       <Paper

//         elevation={8}

//         sx={{

//           width: "100%",

//           maxWidth: 520,

//           p: 5,

//           borderRadius: 5,

//           backdropFilter: "blur(10px)"

//         }}

//       >


//         <Box textAlign="center">


//           <Box

//             component="img"

//             src={logo2}

//             sx={{

//               width: 90,

//               height: 90,

//               borderRadius: "50%",

//               objectFit: "cover",

//               mb: 2

//             }}

//           />


//           <Typography

//             variant="h4"

//             fontWeight="bold"

//           >

//             {t("login.title")}

//           </Typography>


//           <Typography

//             color="text.secondary"

//             mt={1}

//           >

//             {t("login.subtitle")}

//           </Typography>


//         </Box>


//         {/* Student Admin Toggle */}

//         <Tabs

//           value={loginType}

//           onChange={(e, value) => setLoginType(value)}

//           variant="fullWidth"

//           sx={{

//             mt: 4,

//             background: "#f3f4f6",

//             borderRadius: 2

//           }}

//         >

//           <Tab

//             value="student"

//             label={t("login.student")}

//           />

//           <Tab

//             value="admin"

//             label={t("login.admin")}

//           />

//         </Tabs>


//         <Box

//           component="form"

//           onSubmit={handleSubmit}

//           sx={{

//             mt: 4,

//             display: "flex",

//             flexDirection: "column",

//             gap: 3

//           }}

//         >


//           <TextField

//             label={t("login.email")}

//             name="email"

//             value={formData.email}

//             onChange={handleChange}

//             fullWidth

//             InputProps={{

//               startAdornment: (

//                 <InputAdornment position="start">

//                   <Email color="primary" />

//                 </InputAdornment>

//               )

//             }}

//           />


//           <TextField

//             label={t("login.password")}

//             name="password"

//             type={showPassword ? "text" : "password"}

//             value={formData.password}

//             onChange={handleChange}

//             fullWidth

//             InputProps={{

//               startAdornment: (

//                 <InputAdornment position="start">

//                   <Lock color="primary" />

//                 </InputAdornment>

//               ),

//               endAdornment: (

//                 <IconButton

//                   onClick={() => setShowPassword(!showPassword)}

//                 >

//                   {

//                     showPassword

//                       ?

//                       <VisibilityOff />

//                       :

//                       <Visibility />

//                   }

//                 </IconButton>

//               )

//             }}

//           />


//           <Box

//             display="flex"

//             justifyContent="space-between"

//             alignItems="center"

//           >

//             <FormControlLabel

//               control={

//                 <Checkbox

//                   checked={remember}

//                   onChange={() => setRemember(!remember)}

//                 />

//               }

//               label={t("login.rememberMe")}

//             />


//             <Link
//               component={RouterLink}
//               to="/forgot"
              

//               underline="hover"

//             >

//               {t("login.forgotPassword")}

//             </Link>

//           </Box>


//           <Button

//             type="submit"

//             variant="contained"

//             size="large"

//             disabled={loading}

//             sx={{

//               py: 1.5,

//               borderRadius: 2,

//               background: "#008BDC",

//               fontSize: 18

//             }}

//           >

//             {

//               loading

//                 ?

//                 t("login.loggingIn")

//                 :

//                 t("login.loginButton")

//             }

//           </Button>

//         </Box>


//         <Typography

//           textAlign="center"

//           my={3}

//           color="text.secondary"

//         >

//           {t("login.or")}

//         </Typography>


//         <Box

//           display="flex"

//           justifyContent="center"

//         >

//           <GoogleLogin

//             onSuccess={handleGoogleLogin}

//             onError={() => console.log(t("login.googleLoginFailed"))}

//           />

//         </Box>


//         <Typography

//           textAlign="center"

//           mt={3}

//         >

//           {t("login.noAccount")}{" "}

//           <Link 
//           component={RouterLink}
//           to="/register"
//           underline="hover"
//           >

//             {t("login.register")}

//           </Link>

//         </Typography>


//       </Paper>

//     </Box>

//   );

// }


// export default Login;



// import { useState } from "react";
// import axios from "axios";

// import {
//   Box,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   InputAdornment,
//   IconButton,
//   Tabs,
//   Tab,
//   Checkbox,
//   FormControlLabel,
//   Link
// } from "@mui/material";

// import {
//   Visibility,
//   VisibilityOff,
//   Email,
//   Lock
// } from "@mui/icons-material";

// import { GoogleLogin } from "@react-oauth/google";

// import { useNavigate } from "react-router-dom";

// import { useTranslation } from "react-i18next";

// import logo2 from "../assets/logo2.jpg";


// function Login() {

//   const navigate = useNavigate();

//   const { t } = useTranslation();

//   const [loading, setLoading] = useState(false);

//   const [showPassword, setShowPassword] = useState(false);

//   const [remember, setRemember] = useState(false);

//   const [loginType, setLoginType] = useState("student");


//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   const [showOTP, setShowOTP] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [otpUserId, setOtpUserId] = useState(null);
//   const [otpEmail, setOtpEmail] = useState("");




//   const handleChange = (e) => {

//     setFormData({

//       ...formData,

//       [e.target.name]: e.target.value

//     });

//   };


//   const handleGoogleLogin = async (response) => {

//     try {

//       const res = await axios.post(
//         "http://localhost:8000/api/auth/google",
//         {
//           credential: response.credential
//         }
//       );

//       console.log(res.data);

//     }
//     catch (err) {

//       console.log(err);

//     }

//   };


//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:8000/api/auth/login",
//         formData
//       );

//       if (res.data.requiresOTP) {
//   setOtpUserId(res.data.userId);
//   setOtpEmail(res.data.email);
//   setShowOTP(true);
//   return;
// }

//       const user = res.data.user;


//       localStorage.setItem(
//         "token",
//         res.data.token
//       );


//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );


//       if (loginType === "admin" && user.role !== "admin") {

//         alert(t("login.studentOption"));

//         return;

//       }


//       if (loginType === "student" && user.role === "admin") {

//         alert(t("login.adminOption"));

//         return;

//       }


//       if (user.role === "admin") {

//         navigate("/admin/dashboard");

//       }
//       else {

//         navigate("/");

//       }

//     }

//     catch (error) {

//       alert(
//         error.response?.data?.message ||
//         t("login.loginFailed")
//       );

//     }

//     finally {

//       setLoading(false);

//     }

//   };


//   const handleVerifyOTP = async () => {
//     if(!otp){
//       alert(t("login.enterOTP"));
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:8000/api/auth/verify-login-otp",
//         {
//           userId: otpUserId,
//           otp: otp
//         }
//       );

//       const user = res.data.user;

//       localStorage.setItem(
//         "token",
//         res.data.token
//       );

//       localStorage.setItem(
//         "user",
//         JSON.stringify(user)
//       );

//       if (loginType === "admin" && user.role !== "admin") {
//         alert(t("login.studentOption"));
//         return;
//       }

//       if (user.role === "admin") {
//         navigate("/admin/dashboard");

//       } else {
//         navigate("/");
//       }
//     } catch (error){
//       alert(
//         error.response?.data?.message ||
//         "Invalid OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (

//     <Box

//       sx={{

//         minHeight: "100vh",

//         display: "flex",

//         alignItems: "center",

//         justifyContent: "center",

//         backgroundImage: `linear-gradient(
//           rgba(255,255,255,0.75),
//           rgba(255,255,255,0.75)
//         ),url(${logo2})`,

//         backgroundSize: "cover",

//         backgroundPosition: "center",

//         p: 3

//       }}

//     >


//       <Paper

//         elevation={8}

//         sx={{

//           width: "100%",

//           maxWidth: 520,

//           p: 5,

//           borderRadius: 5,

//           backdropFilter: "blur(10px)"

//         }}

//       >


//         <Box textAlign="center">


//           <Box

//             component="img"

//             src={logo2}

//             sx={{

//               width: 90,

//               height: 90,

//               borderRadius: "50%",

//               objectFit: "cover",

//               mb: 2

//             }}

//           />


//           <Typography

//             variant="h4"

//             fontWeight="bold"

//           >

//             {t("login.title")}

//           </Typography>


//           <Typography

//             color="text.secondary"

//             mt={1}

//           >

//             {t("login.subtitle")}

//           </Typography>


//         </Box>


//         {/* Student Admin Toggle */}

//         <Tabs

//           value={loginType}

//           onChange={(e, value) => setLoginType(value)}

//           variant="fullWidth"

//           sx={{

//             mt: 4,

//             background: "#f3f4f6",

//             borderRadius: 2

//           }}

//         >

//           <Tab

//             value="student"

//             label={t("login.student")}

//           />

//           <Tab

//             value="admin"

//             label={t("login.admin")}

//           />

//         </Tabs>


//         <Box

//           component="form"

//           onSubmit={handleSubmit}

//           sx={{

//             mt: 4,

//             display: "flex",

//             flexDirection: "column",

//             gap: 3

//           }}

//         >


//           <TextField

//             label={t("login.email")}

//             name="email"

//             value={formData.email}

//             onChange={handleChange}

//             fullWidth

//             InputProps={{

//               startAdornment: (

//                 <InputAdornment position="start">

//                   <Email color="primary" />

//                 </InputAdornment>

//               )

//             }}

//           />


//           <TextField

//             label={t("login.password")}

//             name="password"

//             type={showPassword ? "text" : "password"}

//             value={formData.password}

//             onChange={handleChange}

//             fullWidth

//             InputProps={{

//               startAdornment: (

//                 <InputAdornment position="start">

//                   <Lock color="primary" />

//                 </InputAdornment>

//               ),

//               endAdornment: (

//                 <IconButton

//                   onClick={() => setShowPassword(!showPassword)}

//                 >

//                   {

//                     showPassword

//                       ?

//                       <VisibilityOff />

//                       :

//                       <Visibility />

//                   }

//                 </IconButton>

//               )

//             }}

//           />


//           <Box

//             display="flex"

//             justifyContent="space-between"

//             alignItems="center"

//           >

//             <FormControlLabel

//               control={

//                 <Checkbox

//                   checked={remember}

//                   onChange={() => setRemember(!remember)}

//                 />

//               }

//               label={t("login.rememberMe")}

//             />


//             <Link

//               href="/forgot"

//               underline="hover"

//             >

//               {t("login.forgotPassword")}

//             </Link>

//           </Box>


//           <Button

//             type="submit"

//             variant="contained"

//             size="large"

//             disabled={loading}

//             sx={{

//               py: 1.5,

//               borderRadius: 2,

//               background: "#008BDC",

//               fontSize: 18

//             }}

//           >

//             {

//               loading

//                 ?

//                 t("login.loggingIn")

//                 :

//                 t("login.loginButton")

//             }

//           </Button>

//         </Box>


//         <Typography

//           textAlign="center"

//           my={3}

//           color="text.secondary"

//         >

//           {t("login.or")}

//         </Typography>


//         <Box

//           display="flex"

//           justifyContent="center"

//         >

//           <GoogleLogin

//             onSuccess={handleGoogleLogin}

//             onError={() => console.log(t("login.googleLoginFailed"))}

//           />

//         </Box>


//         <Typography

//           textAlign="center"

//           mt={3}

//         >

//           {t("login.noAccount")}{" "}

//           <Link href="/register">

//             {t("login.register")}

//           </Link>

//         </Typography>


//       </Paper>

//     </Box>

//   );

// }


// export default Login;












import { useState } from "react";
import axios from "axios";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Checkbox,
  FormControlLabel,
  Link
} from "@mui/material";


import {
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from "@mui/icons-material";


import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";


import logo2 from "../assets/logo2.jpg";



function Login() {


  const navigate = useNavigate();


  const [loading,setLoading] = useState(false);

  const [showPassword,setShowPassword] = useState(false);

  const [remember,setRemember] = useState(false);

  const [loginType,setLoginType] = useState("student");



  const [formData,setFormData] = useState({

    email:"",
    password:""

  });




  const handleChange=(e)=>{

    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });

  };





  const handleGoogleLogin = async(response)=>{

    try{

      const res = await axios.post(
        "http://localhost:8000/api/auth/google",
        {
          credential:response.credential
        }
      );


      console.log(res.data);


    }
    catch(err){

      console.log(err);

    }

  };







  const handleSubmit = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);



      const res = await axios.post(

        "http://localhost:8000/api/auth/login",

        formData

      );



      const user=res.data.user;



      localStorage.setItem(
        "token",
        res.data.token
      );



      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );





      if(loginType==="admin" && user.role!=="admin"){

        alert("Please login using Student option");

        return;

      }




      if(loginType==="student" && user.role==="admin"){

        alert("Please login using Admin option");

        return;

      }




      if(user.role==="admin"){

        navigate("/admin/dashboard");

      }
      else{

        navigate("/");

      }



    }

    catch(error){

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );

    }

    finally{

      setLoading(false);

    }



  };







  return (


    <Box

      sx={{

        minHeight:"100vh",

        display:"flex",

        alignItems:"center",

        justifyContent:"center",

        backgroundImage:`linear-gradient(
        rgba(255,255,255,0.75),
        rgba(255,255,255,0.75)
        ),url(${logo2})`,

        backgroundSize:"cover",

        backgroundPosition:"center",

        p:3

      }}

    >





      <Paper

        elevation={8}

        sx={{

          width:"100%",

          maxWidth:520,

          p:5,

          borderRadius:5,

          backdropFilter:"blur(10px)"

        }}

      >





        <Box textAlign="center">


          <Box

            component="img"

            src={logo2}

            sx={{

              width:90,

              height:90,

              borderRadius:"50%",

              objectFit:"cover",

              mb:2

            }}

          />





          <Typography

            variant="h4"

            fontWeight="bold"

          >

            Welcome Back

          </Typography>



          <Typography

            color="text.secondary"

            mt={1}

          >

            Login to continue

          </Typography>




        </Box>







        {/* Student Admin Toggle */}



        <Tabs

          value={loginType}

          onChange={(e,value)=>setLoginType(value)}

          variant="fullWidth"

          sx={{

            mt:4,

            background:"#f3f4f6",

            borderRadius:2

          }}

        >


          <Tab

            value="student"

            label="Student"

          />


          <Tab

            value="admin"

            label="Admin"

          />


        </Tabs>








        <Box

          component="form"

          onSubmit={handleSubmit}

          sx={{

            mt:4,

            display:"flex",

            flexDirection:"column",

            gap:3

          }}

        >





          <TextField

            label="Email"

            name="email"

            value={formData.email}

            onChange={handleChange}

            fullWidth

            InputProps={{

              startAdornment:(

                <InputAdornment position="start">

                  <Email color="primary"/>

                </InputAdornment>

              )

            }}

          />







          <TextField

            label="Password"

            name="password"

            type={showPassword?"text":"password"}

            value={formData.password}

            onChange={handleChange}

            fullWidth


            InputProps={

              {

                startAdornment:(

                  <InputAdornment position="start">

                    <Lock color="primary"/>

                  </InputAdornment>

                ),



                endAdornment:(

                  <IconButton

                    onClick={()=>setShowPassword(!showPassword)}

                  >

                    {
                      showPassword
                      ?
                      <VisibilityOff/>
                      :
                      <Visibility/>
                    }


                  </IconButton>

                )

              }

            }

          />








          <Box

            display="flex"

            justifyContent="space-between"

            alignItems="center"

          >


            <FormControlLabel

              control={

                <Checkbox

                  checked={remember}

                  onChange={()=>setRemember(!remember)}

                />

              }

              label="Remember Me"

            />

            <Link

              href="/forgot"

              underline="hover"
            >
              Forgot Password?

            </Link>
          </Box>
          <Button

            type="submit"

            variant="contained"

            size="large"

            disabled={loading}

            sx={{

              py:1.5,

              borderRadius:2,

              background:"#008BDC",

              fontSize:18

            }}

          >

            {
              loading
              ?
              "Logging In..."
              :
              "Login"
            }


          </Button>

        </Box>


        <Typography

          textAlign="center"

          my={3}

          color="text.secondary"

        >

          OR

        </Typography>

        <Box

          display="flex"

          justifyContent="center"

        >


          <GoogleLogin

            onSuccess={handleGoogleLogin}

            onError={()=>console.log("Google Login Failed")}

          />


        </Box>

        <Typography

          textAlign="center"

          mt={3}

        >

          Don't have an account?{" "}


          <Link href="/register">

            Register

          </Link>


        </Typography>

      </Paper>

    </Box>


  );

}


export default Login;