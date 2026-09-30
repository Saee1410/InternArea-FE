import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../LanguageSelector";

import {
  AppBar,
  Toolbar,
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Typography,
  Drawer,
  Divider,
} from "@mui/material";

import {
  Search,
  Menu as MenuIcon,
  X,
} from "lucide-react";

import logo from "../../assets/logo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Invalid user data:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleNavigation = (path) => {
    closeSidebar();
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    closeSidebar();

    navigate("/login");

    window.location.reload();
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          background: "#fff",
          color: "#111",
        }}
      >
        <Toolbar
          sx={{
            height: 100,
            px: { xs: 2, lg: 8 },
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="logo"
                sx={{
                  width: 65,
                  height: 65,
                  borderRadius: 2,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 4,
            }}
          >
            {/* Internships */}
            <Button
              component={Link}
              to="/internships"
              sx={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#374151",
                textTransform: "none",

                "&:hover": {
                  color: "#00A5EC",
                },
              }}
            >
              {t("navbar.internships")}
            </Button>

            {/* Jobs */}
            <Button
              component={Link}
              to="/jobs"
              sx={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#374151",
                textTransform: "none",

                "&:hover": {
                  color: "#00A5EC",
                },
              }}
            >
              {t("navbar.jobs")}
            </Button>

            {/* Plans */}
            <Button
              component={Link}
              to="/subscriptions"
              sx={{
                fontSize: 17,
                fontWeight: "bold",
                color: "#374151",
                textTransform: "none",

                "&:hover": {
                  color: "#00A5EC",
                },
              }}
            >
              {t("navbar.plans")}
            </Button>
          </Box>

          {/* ================= DESKTOP SEARCH ================= */}
          <TextField
            placeholder={t("hero.searchPlaceholder")}
            sx={{
              display: { xs: "none", lg: "flex" },
              width: 340,
              background: "#f3f4f6",
              borderRadius: 2,

              "& fieldset": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />

          {/* ================= DESKTOP RIGHT SIDE ================= */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <LanguageSelector />

            {!user ? (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  px: 4,
                  py: 1.2,
                  borderRadius: 2,
                  borderColor: "#00A5EC",
                  color: "#00A5EC",
                  fontWeight: "bold",
                  textTransform: "none",

                  "&:hover": {
                    borderColor: "#00A5EC",
                    background: "#f0faff",
                  },
                }}
              >
                {t("navbar.login")}
              </Button>
            ) : (
              <>
                {/* Profile */}
                <Box
                  onClick={() =>
                    navigate(
                      user.role === "admin"
                        ? "/admin"
                        : "/profile"
                    )
                  }
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer",
                  }}
                >
                  <Avatar
                    src={user.profilePhoto}
                    sx={{
                      width: 40,
                      height: 40,
                    }}
                  />

                  <Typography
                    fontWeight="bold"
                    color="black"
                  >
                    {user.name}
                  </Typography>
                </Box>

                {/* Logout */}
                <Button
                  onClick={handleLogout}
                  variant="contained"
                  sx={{
                    px: 3,
                    py: 1.2,
                    borderRadius: 2,
                    background: "#00A5EC",
                    fontWeight: "bold",
                    textTransform: "none",

                    "&:hover": {
                      background: "#008dcc",
                    },
                  }}
                >
                  {t("navbar.logout")}
                </Button>
              </>
            )}
          </Box>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <IconButton
            onClick={() => setSidebarOpen(true)}
            sx={{
              display: { xs: "flex", lg: "none" },
              color: "#111",
            }}
          >
            <MenuIcon size={30} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* =====================================================
          MOBILE SIDEBAR / DRAWER
      ===================================================== */}

      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={closeSidebar}
        PaperProps={{
          sx: {
            width: {
              xs: "82%",
              sm: 360,
            },
            background: "#fff",
          },
        }}
      >
        {/* Sidebar Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 2,
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{
              width: 50,
              height: 50,
              borderRadius: 2,
              objectFit: "cover",
            }}
          />

          <IconButton onClick={closeSidebar}>
            <X size={27} />
          </IconButton>
        </Box>

        <Divider />

        {/* ================= SEARCH ================= */}
        <Box sx={{ px: 2, py: 2 }}>
          <TextField
            fullWidth
            placeholder={t("hero.searchPlaceholder")}
            sx={{
              background: "#f3f4f6",
              borderRadius: 2,

              "& fieldset": {
                border: "none",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Divider />

        {/* ================= MENU LINKS ================= */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            px: 2,
            py: 2,
            gap: 1,
          }}
        >
          <Button
            onClick={() => handleNavigation("/internships")}
            sx={{
              justifyContent: "flex-start",
              fontSize: 17,
              fontWeight: "bold",
              color: "#374151",
              textTransform: "none",
              py: 1.5,
              px: 2,

              "&:hover": {
                color: "#00A5EC",
                background: "#f0faff",
              },
            }}
          >
            {t("navbar.internships")}
          </Button>

          <Button
            onClick={() => handleNavigation("/jobs")}
            sx={{
              justifyContent: "flex-start",
              fontSize: 17,
              fontWeight: "bold",
              color: "#374151",
              textTransform: "none",
              py: 1.5,
              px: 2,

              "&:hover": {
                color: "#00A5EC",
                background: "#f0faff",
              },
            }}
          >
            {t("navbar.jobs")}
          </Button>

          <Button
            onClick={() => handleNavigation("/subscriptions")}
            sx={{
              justifyContent: "flex-start",
              fontSize: 17,
              fontWeight: "bold",
              color: "#374151",
              textTransform: "none",
              py: 1.5,
              px: 2,

              "&:hover": {
                color: "#00A5EC",
                background: "#f0faff",
              },
            }}
          >
            {t("navbar.plans")}
          </Button>
        </Box>

        <Divider />

        {/* ================= LANGUAGE ================= */}
        <Box
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 1,
              color: "#374151",
            }}
          >
            Language
          </Typography>

          <LanguageSelector />
        </Box>

        <Divider />

        {/* ================= USER SECTION ================= */}
        <Box
          sx={{
            px: 2,
            py: 2,
          }}
        >
          {!user ? (
            <Button
              fullWidth
              onClick={() => handleNavigation("/login")}
              variant="outlined"
              sx={{
                py: 1.3,
                borderRadius: 2,
                borderColor: "#00A5EC",
                color: "#00A5EC",
                fontWeight: "bold",
                textTransform: "none",
                fontSize: 16,

                "&:hover": {
                  borderColor: "#00A5EC",
                  background: "#f0faff",
                },
              }}
            >
              {t("navbar.login")}
            </Button>
          ) : (
            <>
              {/* Profile */}
              <Box
                onClick={() =>
                  handleNavigation(
                    user.role === "admin"
                      ? "/admin"
                      : "/profile"
                  )
                }
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  cursor: "pointer",
                  p: 1.5,
                  borderRadius: 2,

                  "&:hover": {
                    background: "#f3f4f6",
                  },
                }}
              >
                <Avatar
                  src={user.profilePhoto}
                  sx={{
                    width: 45,
                    height: 45,
                  }}
                />

                <Box>
                  <Typography
                    fontWeight="bold"
                    color="#111"
                  >
                    {user.name}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {user.role === "admin"
                      ? "Admin"
                      : "Profile"}
                  </Typography>
                </Box>
              </Box>

              {/* Logout */}
              <Button
                fullWidth
                onClick={handleLogout}
                variant="contained"
                sx={{
                  mt: 2,
                  py: 1.3,
                  borderRadius: 2,
                  background: "#00A5EC",
                  fontWeight: "bold",
                  textTransform: "none",
                  fontSize: 16,

                  "&:hover": {
                    background: "#008dcc",
                  },
                }}
              >
                {t("navbar.logout")}
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;



// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";
// import LanguageSelector from "../LanguageSelector";

// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Button,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Avatar,
//   Typography,
// } from "@mui/material";

// import {
//   Search,
//   Menu as MenuIcon,
// } from "lucide-react";

// import logo from "../../assets/logo.jpg";

// function Navbar() {
//   const navigate = useNavigate();

//   const { t } = useTranslation();

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");

//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser(null);

//     navigate("/login");

//     window.location.reload();
//   };

//   return (
//     <AppBar
//       position="sticky"
//       elevation={1}
//       sx={{
//         background: "#fff",
//         color: "#111",
//       }}
//     >
//       <Toolbar
//         sx={{
//           height: 100,
//           px: { xs: 2, lg: 8 },
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >

//         {/* Logo */}
//         <Link
//           to="/"
//           style={{
//             textDecoration: "none",
//             color: "inherit",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//             }}
//           >
//             <Box
//               component="img"
//               src={logo}
//               alt="logo"
//               sx={{
//                 width: 65,
//                 height: 65,
//                 borderRadius: 2,
//               }}
//             />
//           </Box>
//         </Link>


//         {/* Menu */}
//         <Box
//           sx={{
//             display: { xs: "none", lg: "flex" },
//             gap: 4,
//           }}
//         >

//           {/* Internships */}
//           <Button
//             component={Link}
//             to="/internships"
//             sx={{
//               fontSize: 17,
//               fontWeight: "bold",
//               color: "#374151",
//               textTransform: "none",

//               "&:hover": {
//                 color: "#00A5EC",
//               },
//             }}
//           >
//             {t("navbar.internships")}
//           </Button>


//           {/* Jobs */}
//           <Button
//             component={Link}
//             to="/jobs"
//             sx={{
//               fontSize: 17,
//               fontWeight: "bold",
//               color: "#374151",
//               textTransform: "none",

//               "&:hover": {
//                 color: "#00A5EC",
//               },
//             }}
//           >
//             {t("navbar.jobs")}
//           </Button>

//           <Button
//             component={Link}
//             to="/subscriptions"
//             sx={{
//               fontSize: 17,
//               fontWeight: "bold",
//               color: "#374151",
//               textTransform: "none",

//               "&:hover": {
//                 color: "#00A5EC",
//               },
//             }}
//           >
//             {t("navbar.plans")}
//           </Button>

//         </Box>


//         {/* Search */}
//         <TextField
//           placeholder={t("hero.searchPlaceholder")}
//           sx={{
//             display: { xs: "none", lg: "flex" },
//             width: 340,
//             background: "#f3f4f6",
//             borderRadius: 2,

//             "& fieldset": {
//               border: "none",
//             },
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search size={20} />
//               </InputAdornment>
//             ),
//           }}
//         />


//         {/* Right Side */}
//         <Box
//           sx={{
//             display: { xs: "none", lg: "flex" },
//             gap: 2,
//             alignItems: "center",
//           }}
//         >

//           {/* Language Selector */}
//           <LanguageSelector />


//           {/* Login / Profile */}
//           {!user ? (

//             /* Login */
//             <Button
//               component={Link}
//               to="/login"
//               variant="outlined"
//               sx={{
//                 px: 4,
//                 py: 1.2,
//                 borderRadius: 2,
//                 borderColor: "#00A5EC",
//                 color: "#00A5EC",
//                 fontWeight: "bold",
//                 textTransform: "none",

//                 "&:hover": {
//                   borderColor: "#00A5EC",
//                   background: "#f0faff",
//                 },
//               }}
//             >
//               {t("navbar.login")}
//             </Button>

//           ) : (

//             <>
//               {/* Profile */}
//               <Box
//                 onClick={() =>
//                   navigate(
//                     user.role === "admin"
//                       ? "/admin"
//                       : "/profile"
//                   )
//                 }
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   cursor: "pointer",
//                 }}
//               >

//                 <Avatar
//                   src={user.profilePhoto}
//                   sx={{
//                     width: 40,
//                     height: 40,
//                   }}
//                 />

//                 <Typography
//                   fontWeight="bold"
//                   color="black"
//                 >
//                   {user.name}
//                 </Typography>

//               </Box>


//               {/* Logout */}
//               <Button
//                 onClick={handleLogout}
//                 variant="contained"
//                 sx={{
//                   px: 3,
//                   py: 1.2,
//                   borderRadius: 2,
//                   background: "#00A5EC",
//                   fontWeight: "bold",
//                   textTransform: "none",

//                   "&:hover": {
//                     background: "#008dcc",
//                   },
//                 }}
//               >
//                 {t("navbar.logout")}
//               </Button>

//             </>
//           )}

//         </Box>


//         {/* Mobile Menu */}
//         <IconButton
//           sx={{
//             display: { xs: "flex", lg: "none" },
//           }}
//         >
//           <MenuIcon size={30} />
//         </IconButton>

//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;




// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import LanguageSelector from "./LanguageSelector";

// import {
//   AppBar,
//   Toolbar,
//   Box,
//   Button,
//   TextField,
//   InputAdornment,
//   IconButton,
//   Avatar,
//   Typography,
// } from "@mui/material";

// import {
//   Search,
//   Menu as MenuIcon,
// } from "lucide-react";

// import logo from "../../assets/logo.jpg";

// function Navbar() {

//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");

//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   const handleLogout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setUser(null);

//     navigate("/login");

//     window.location.reload();

//   };

//   return (

//     <AppBar
//       position="sticky"
//       elevation={1}
//       sx={{
//         background: "#fff",
//         color: "#111",
//       }}
//     >

//       <Toolbar
//         sx={{
//           height: 100,
//           px: {
//             xs: 2,
//             lg: 8,
//           },
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >

//         {/* Logo */}

//         <Link
//           to="/"
//           style={{
//             textDecoration: "none",
//             color: "inherit",
//           }}
//         >

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 2,
//             }}
//           >

//             <Box
//               component="img"
//               src={logo}
//               alt="logo"
//               sx={{
//                 width: 65,
//                 height: 65,
//                 borderRadius: 2,
//               }}
//             />

//           </Box>

//         </Link>

//         {/* Menu */}

//         <Box
//           sx={{
//             display: {
//               xs: "none",
//               lg: "flex",
//             },
//             gap: 4,
//           }}
//         >

//           {[
//             {
//               name: "Internships",
//               path: "/internships",
//             },
//             {
//               name: "Jobs",
//               path: "/jobs",
//             },
//           ].map((item) => (

//             <Button
//               key={item.name}
//               component={Link}
//               to={item.path}
//               sx={{
//                 fontSize: 17,
//                 fontWeight: "bold",
//                 color: "#374151",
//                 textTransform: "none",

//                 "&:hover": {
//                   color: "#00A5EC",
//                 },
//               }}
//             >
//               {item.name}
//             </Button>

//           ))}

//         </Box>

//         {/* Search */}

//         <TextField
//           placeholder="Search internships..."
//           sx={{
//             display: {
//               xs: "none",
//               lg: "flex",
//             },

//             width: 340,

//             background: "#f3f4f6",

//             borderRadius: 2,

//             "& fieldset": {
//               border: "none",
//             },
//           }}

//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <Search size={20} />
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Box
//           sx={{
//             display: {
//               xs: "none",
//               lg: "flex",
//             },
//             gap: 2,
//             alignItems: "center",
//           }}
//         >
//           {!user ? (
//             <Button
//               component={Link}
//               to="/login"
//               variant="outlined"
//               sx={{
//                 px: 4,
//                 py: 1.2,
//                 borderRadius: 2,
//                 borderColor: "#00A5EC",
//                 color: "#00A5EC",
//                 fontWeight: "bold",
//                 textTransform: "none",
//               }}
//             >
//               Login
//             </Button>
//           ) : (
//             <>
//               {/* Profile Icon + Name (Direct Route on Click) */}
//               <Box
//                 onClick={() =>
//                   navigate(
//                     user.role === "admin" ? "/admin" : "/profile"
//                   )
//                 }
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                   cursor: "pointer",
//                 }}
//               >
//                 <Avatar
//                   src={user.profilePhoto}
//                   sx={{
//                     width: 40,
//                     height: 40,
//                   }}
//                 />

//                 <Typography
//                   fontWeight="bold"
//                   color="black"
//                 >
//                   {user.name}
//                 </Typography>
//               </Box>

//               {/* Directly showing Logout Button */}
//               <Button
//                 onClick={handleLogout}
//                 variant="contained"
//                 sx={{
//                   px: 3,
//                   py: 1.2,
//                   borderRadius: 2,
//                   background: "#00A5EC",
//                   fontWeight: "bold",
//                   textTransform: "none",
//                 }}
//               >
//                 Logout
//               </Button>
//             </>
//           )}
//         </Box>

//         {/* Mobile Menu */}

//         <IconButton
//           sx={{
//             display: {
//               xs: "flex",
//               lg: "none",
//             },
//           }}
//         >
//           <MenuIcon size={30} />
//         </IconButton>

//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;