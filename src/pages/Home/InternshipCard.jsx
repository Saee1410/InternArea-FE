import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  Building2,
  MapPin,
  IndianRupee,
  Clock3,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";

function InternshipCard({ internship, type }) {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const handleViewDetails = () => {
    if (type === "job") {
      navigate(`/details/job/${internship._id}`);
    } else {
      console.log(internship._id);
      navigate(`/details/internship/${internship._id}`);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        minHeight: {
          xs: 360,
          sm: 370,
          md: 380,
        },

        display: "flex",
        flexDirection: "column",

        borderRadius: 3,
        boxShadow: 1,
        border: "1px solid #e5e7eb",
        transition: "0.3s",

        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-5px)",
        },
      }}
    >
      {/* Top Content */}
      <CardContent
        sx={{
          p: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },

          flexGrow: 1,
        }}
      >
        {/* Badge + Icon */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Chip
            label={t("internshipCard.activelyHiring")}
            size="small"
            sx={{
              color: "#00A5EC",
              background: "#eaf7ff",
              fontWeight: 500,

              maxWidth: "80%",

              "& .MuiChip-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              },
            }}
          />

          <Building2
            size={22}
            color="#9ca3af"
            style={{
              flexShrink: 0,
            }}
          />
        </Box>

        {/* Company */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            mt: 3,

            fontSize: {
              xs: "1.05rem",
              sm: "1.1rem",
              md: "1.25rem",
            },

            lineHeight: 1.4,

            overflow: "hidden",
            textOverflow: "ellipsis",

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",

            wordBreak: "break-word",
          }}
        >
          {internship.company}
        </Typography>

        {/* Role */}
        <Typography
          color="text.secondary"
          sx={{
            mt: 0.5,

            fontSize: {
              xs: "0.9rem",
              sm: "0.95rem",
              md: "1rem",
            },

            lineHeight: 1.4,

            overflow: "hidden",
            textOverflow: "ellipsis",

            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",

            wordBreak: "break-word",
          }}
        >
          {internship.title}
        </Typography>

        {/* Details */}
        <Box
          sx={{
            mt: 3,

            display: "flex",
            flexDirection: "column",

            gap: {
              xs: 1.5,
              sm: 2,
            },
          }}
        >
          {/* Location */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1.5,
              color: "#6b7280",
              minWidth: 0,
            }}
          >
            <MapPin
              size={18}
              style={{
                flexShrink: 0,
                marginTop: 2,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.9rem",
                  md: "1rem",
                },

                lineHeight: 1.4,

                overflow: "hidden",
                textOverflow: "ellipsis",

                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",

                wordBreak: "break-word",
              }}
            >
              {internship.location}
            </Typography>
          </Box>

          {/* Stipend */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "#6b7280",
              minWidth: 0,
            }}
          >
            <IndianRupee
              size={18}
              style={{
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.9rem",
                  md: "1rem",
                },

                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {internship.stipend}
            </Typography>
          </Box>

          {/* Duration */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "#6b7280",
              minWidth: 0,
            }}
          >
            <Clock3
              size={18}
              style={{
                flexShrink: 0,
              }}
            />

            <Typography
              sx={{
                fontSize: {
                  xs: "0.85rem",
                  sm: "0.9rem",
                  md: "1rem",
                },

                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {internship.duration}
            </Typography>
          </Box>
        </Box>
      </CardContent>

      {/* Bottom */}
      <CardActions
        sx={{
          borderTop: "1px solid #f1f1f1",

          px: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },

          py: {
            xs: 1.5,
            sm: 2,
          },

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          gap: 1,
        }}
      >
        {/* Job / Internship */}
        <Chip
          label={
            type === "job"
              ? t("internshipCard.job")
              : t("internshipCard.internship")
          }
          size="small"
          sx={{
            background: "#f3f4f6",
            color: "#374151",

            flexShrink: 0,

            maxWidth: {
              xs: "45%",
              sm: "50%",
            },

            "& .MuiChip-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
        />

        {/* View Details */}
        <Button
          endIcon={<ArrowRight size={18} />}
          onClick={handleViewDetails}
          sx={{
            color: "#00A5EC",
            fontWeight: "600",
            textTransform: "none",

            minWidth: 0,

            px: {
              xs: 1,
              sm: 1.5,
            },

            fontSize: {
              xs: "0.8rem",
              sm: "0.875rem",
            },

            whiteSpace: "nowrap",
          }}
        >
          {t("internshipCard.viewDetails")}
        </Button>
      </CardActions>
    </Card>
  );
}

export default InternshipCard;




// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// import {
//   Building2,
//   MapPin,
//   IndianRupee,
//   Clock3,
//   ArrowRight,
// } from "lucide-react";

// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Box,
//   Button,
//   Chip,
// } from "@mui/material";

// function InternshipCard({ internship, type }) {
//   const navigate = useNavigate();

//   // i18next
//   const { t } = useTranslation();

//   const handleViewDetails = () => {
//     if (type === "job") {
//       navigate(`/details/job/${internship._id}`);
//     } else {
//       console.log(internship._id);
//       navigate(`/details/internship/${internship._id}`);
//     }
//   };

//   return (
//     <Card
//       sx={{
//         borderRadius: 3,
//         boxShadow: 1,
//         border: "1px solid #e5e7eb",
//         transition: "0.3s",

//         "&:hover": {
//           boxShadow: 6,
//           transform: "translateY(-5px)",
//         },
//       }}
//     >
//       {/* Top Content */}
//       <CardContent
//         sx={{
//           p: 3,
//         }}
//       >
//         {/* Badge + Icon */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Chip
//             label={t("internshipCard.activelyHiring")}
//             size="small"
//             sx={{
//               color: "#00A5EC",
//               background: "#eaf7ff",
//               fontWeight: 500,
//             }}
//           />

//           <Building2
//             size={22}
//             color="#9ca3af"
//           />
//         </Box>

//         {/* Company */}
//         <Typography
//           variant="h6"
//           fontWeight="bold"
//           sx={{
//             mt: 3,
//           }}
//         >
//           {internship.company}
//         </Typography>

//         {/* Role */}
//         <Typography
//           color="text.secondary"
//           sx={{
//             mt: 0.5,
//           }}
//         >
//           {internship.title}
//         </Typography>

//         {/* Details */}
//         <Box
//           sx={{
//             mt: 3,
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//           }}
//         >
//           {/* Location */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               color: "#6b7280",
//             }}
//           >
//             <MapPin size={18} />

//             <Typography>
//               {internship.location}
//             </Typography>
//           </Box>

//           {/* Stipend */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               color: "#6b7280",
//             }}
//           >
//             <IndianRupee size={18} />

//             <Typography>
//               {internship.stipend}
//             </Typography>
//           </Box>

//           {/* Duration */}
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: 1.5,
//               color: "#6b7280",
//             }}
//           >
//             <Clock3 size={18} />

//             <Typography>
//               {internship.duration}
//             </Typography>
//           </Box>
//         </Box>
//       </CardContent>

//       {/* Bottom */}
//       <CardActions
//         sx={{
//           borderTop: "1px solid #f1f1f1",
//           px: 3,
//           py: 2,
//           display: "flex",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* Job / Internship */}
//         <Chip
//           label={
//             type === "job"
//               ? t("internshipCard.job")
//               : t("internshipCard.internship")
//           }
//           size="small"
//           sx={{
//             background: "#f3f4f6",
//             color: "#374151",
//           }}
//         />

//         {/* View Details */}
//         <Button
//           endIcon={<ArrowRight size={18} />}
//           onClick={handleViewDetails}
//           sx={{
//             color: "#00A5EC",
//             fontWeight: "600",
//             textTransform: "none",
//           }}
//         >
//           {t("internshipCard.viewDetails")}
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

// export default InternshipCard;



// import { useNavigate } from "react-router-dom";

// import {
//   Building2,
//   MapPin,
//   IndianRupee,
//   Clock3,
//   ArrowRight,
// } from "lucide-react";


// import {
//   Card,
//   CardContent,
//   CardActions,
//   Typography,
//   Box,
//   Button,
//   Chip
// } from "@mui/material";



// function InternshipCard({ internship, type }) {
//   const navigate = useNavigate();

//   const handleViewDetails = () => {
//     if (type === "job"){
//       navigate(`/details/job/${internship._id}`);
//     } else {
//       console.log(internship._id);
//       navigate(`/details/internship/${internship._id}`);
//     }
//   };

//   return (
//     <Card

//       sx={{

//         borderRadius:3,

//         boxShadow:1,

//         border:"1px solid #e5e7eb",

//         transition:"0.3s",

//         "&:hover":{

//           boxShadow:6,

//           transform:"translateY(-5px)"

//         }

//       }}

//     >

//       {/* Top Content */}

//       <CardContent
//         sx={{
//           p:3
//         }}
//       >




//         {/* Badge + Icon */}


//         <Box

//           sx={{

//             display:"flex",

//             justifyContent:"space-between",

//             alignItems:"center"

//           }}

//         >



//           <Chip

//             label="Actively Hiring"

//             size="small"

//             sx={{

//               color:"#00A5EC",

//               background:"#eaf7ff",

//               fontWeight:500

//             }}

//           />




//           <Building2

//             size={22}

//             color="#9ca3af"

//           />


//         </Box>


//         {/* Company */}

//         <Typography

//           variant="h6"

//           fontWeight="bold"

//           sx={{
//             mt:3
//           }}

//         >

//           {internship.company}

//         </Typography>


//         {/* Role */}


//         <Typography

//           color="text.secondary"

//           sx={{
//             mt:0.5
//           }}

//         >

//           {internship.title}

//         </Typography>

//         {/* Details */}



//         <Box

//           sx={{

//             mt:3,

//             display:"flex",

//             flexDirection:"column",

//             gap:2

//           }}
//         >

//           <Box

//             sx={{

//               display:"flex",

//               alignItems:"center",

//               gap:1.5,

//               color:"#6b7280"

//             }}

//           >

//             <MapPin size={18}/>

//             <Typography>

//               {internship.location}

//             </Typography>


//           </Box>

//           <Box

//             sx={{

//               display:"flex",

//               alignItems:"center",

//               gap:1.5,

//               color:"#6b7280"

//             }}

//           >

//             <IndianRupee size={18}/>

//             <Typography>

//               {internship.stipend}

//             </Typography>

//           </Box>

//           <Box

//             sx={{

//               display:"flex",

//               alignItems:"center",

//               gap:1.5,

//               color:"#6b7280"

//             }}

//           >

//             <Clock3 size={18}/>


//             <Typography>

//               {internship.duration}

//             </Typography>


//           </Box>



//         </Box>



//       </CardContent>

//       {/* Bottom */}

//       <CardActions

//         sx={{

//           borderTop:"1px solid #f1f1f1",

//           px:3,

//           py:2,

//           display:"flex",

//           justifyContent:"space-between"

//         }}

//       >
//         <Chip 
//          label={type === "job" ? "Job" : "Internship"}
//          size="small"
//          sx={{
//           background: "#f3f4f6",
//            color: "#374151",
//          }}
//         />
//         <Button

//           endIcon={<ArrowRight size={18}/>}

//           onClick={handleViewDetails}

//           sx={{

//             color:"#00A5EC",

//             fontWeight:"600",

//             textTransform:"none"

//           }}
//         >
//           View Details
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

// export default InternshipCard;