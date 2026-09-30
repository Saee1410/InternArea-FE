import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  IconButton,
  CircularProgress,
} from "@mui/material";

import {
  CallMade as ArrowUpRight,
  AccountBalanceWalletOutlined as Banknote,
  CalendarTodayOutlined as Calendar,
  ChevronRight,
  ChevronLeft,
  LocationOnOutlined as MapPin,
  TrendingUp,
} from "@mui/icons-material";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import axios from "axios";

// =====================================================
// API
// =====================================================

import { API_URL } from "../../utils/apiConfig";

// =====================================================
// COMPONENT
// =====================================================

export default function SvgSlider() {
  const { t } = useTranslation();

  // =====================================================
  // STATES
  // =====================================================

  const [internships, setInternships] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [loading, setLoading] = useState(true);

  // =====================================================
  // SLIDER DATA
  // =====================================================

  const slides = [
    {
      id: 1,
      title: t("home.growSkills"),
      bgColor:
        "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
      pattern: "grid",
    },
    {
      id: 2,
      title: t("home.startCareer"),
      bgColor:
        "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
      pattern: "dots",
    },
    {
      id: 3,
      title: t("home.learnBest"),
      bgColor:
        "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
      pattern: "squares",
    },
    {
      id: 4,
      title: t("home.connectCompanies"),
      bgColor:
        "linear-gradient(135deg, #0D9488 0%, #115E59 100%)",
      pattern: "diamonds",
    },
  ];

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  // =====================================================
  // FETCH INTERNSHIPS + JOBS
  // =====================================================

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);

        const [internshipResponse, jobResponse] =
          await Promise.all([
            axios.get(`${API_URL}/api/internship`),
            axios.get(`${API_URL}/api/job`),
          ]);

        setInternships(
          Array.isArray(internshipResponse.data)
            ? internshipResponse.data
            : []
        );

        setJobs(
          Array.isArray(jobResponse.data)
            ? jobResponse.data
            : []
        );
      } catch (error) {
        console.error(
          "Error fetching internships/jobs:",
          error
        );

        setInternships([]);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // =====================================================
  // FILTER DATA
  // =====================================================

  const filteredInternships = internships.filter(
    (internship) =>
      !selectedCategory ||
      internship.category === selectedCategory
  );

  const filteredJobs = jobs.filter(
    (job) =>
      !selectedCategory ||
      job.category === selectedCategory
  );

  // =====================================================
  // CARD COMPONENT
  // =====================================================

  const ListingCard = ({ item, type }) => {
    const isInternship = type === "internship";

    const title = item?.title || "Untitled";

    const company =
      item?.company || "Company not specified";

    const location =
      item?.location || "Location not specified";

    const money = isInternship
      ? item?.stipend
      : item?.CTC || item?.salary;

    const dateOrDuration = isInternship
      ? item?.startDate || item?.duration
      : item?.StartDate || item?.Experience;

    const detailsRoute = isInternship
      ? `/detailinternship/${item?._id}`
      : `/detailjob/${item?._id}`;

    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          bgcolor: "#FFFFFF",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "all 0.25s ease",

          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow:
              "0 12px 25px -10px rgba(15, 23, 42, 0.18)",
            borderColor: "#CBD5E1",
          },
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2.5, md: 3 },
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* =================================================
              ACTIVELY HIRING
          ================================================= */}

          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            sx={{
              bgcolor: "#E0F2FE",
              color: "#0369A1",
              px: 1.2,
              py: 0.5,
              borderRadius: "5px",
              width: "fit-content",
              mb: 2,
            }}
          >
            <ArrowUpRight
              sx={{
                fontSize: 16,
              }}
            />

            <Typography
              variant="caption"
              fontWeight="700"
            >
              {t("home.activelyHiring")}
            </Typography>
          </Stack>

          {/* =================================================
              TITLE
          ================================================= */}

          <Typography
            variant="h6"
            fontWeight="700"
            color="#0F172A"
            sx={{
              mb: 0.5,
              lineHeight: 1.4,
              wordBreak: "break-word",
            }}
          >
            {title}
          </Typography>

          {/* =================================================
              COMPANY
          ================================================= */}

          <Typography
            variant="body2"
            fontWeight="500"
            color="#64748B"
            sx={{
              mb: 2.5,
            }}
          >
            {company}
          </Typography>

          {/* =================================================
              DETAILS
          ================================================= */}

          <Stack
            spacing={1.5}
            sx={{
              mb: 3,
              flexGrow: 1,
            }}
          >
            {/* Location */}

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <MapPin
                sx={{
                  fontSize: 18,
                  color: "#94A3B8",
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="body2"
                color="#475569"
                sx={{
                  wordBreak: "break-word",
                }}
              >
                {location}
              </Typography>
            </Stack>

            {/* Stipend / Salary */}

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Banknote
                sx={{
                  fontSize: 18,
                  color: "#94A3B8",
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="body2"
                color="#475569"
              >
                {money
                  ? `₹ ${money}`
                  : t("home.tbd")}
              </Typography>
            </Stack>

            {/* Date / Duration / Experience */}

            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
            >
              <Calendar
                sx={{
                  fontSize: 18,
                  color: "#94A3B8",
                  flexShrink: 0,
                }}
              />

              <Typography
                variant="body2"
                color="#475569"
              >
                {dateOrDuration ||
                  t("home.immediate")}
              </Typography>
            </Stack>
          </Stack>

          {/* =================================================
              FOOTER
          ================================================= */}

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            pt={2}
            sx={{
              borderTop:
                "1px solid #F1F5F9",
            }}
          >
            {/* TYPE */}

            <Chip
              label={
                isInternship
                  ? t("home.internship")
                  : t("home.job")
              }
              size="small"
              sx={{
                bgcolor: "#F1F5F9",
                color: "#475569",
                fontWeight: 600,
                borderRadius: "6px",
              }}
            />

            {/* DETAILS */}

            <Button
              component={RouterLink}
              to={detailsRoute}
              endIcon={<ChevronRight />}
              sx={{
                color: "#008BDC",
                textTransform: "none",
                fontWeight: 700,
                whiteSpace: "nowrap",

                "&:hover": {
                  bgcolor: "#F0F9FF",
                },
              }}
            >
              {t("home.viewDetails")}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    );
  };

  // =====================================================
  // SVG PATTERN
  // =====================================================

  const renderPattern = (pattern, index) => {
    const patternId =
      `slider-pattern-${pattern}-${index}`;

    return (
      <svg
        style={{
          width: "100%",
          height: "100%",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {pattern === "grid" && (
            <pattern
              id={patternId}
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </pattern>
          )}

          {pattern === "dots" && (
            <pattern
              id={patternId}
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="15"
                cy="15"
                r="3"
                fill="white"
              />
            </pattern>
          )}

          {pattern === "squares" && (
            <pattern
              id={patternId}
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <rect
                x="15"
                y="15"
                width="10"
                height="10"
                fill="white"
              />
            </pattern>
          )}

          {pattern === "diamonds" && (
            <pattern
              id={patternId}
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M25 5 L45 25 L25 45 L5 25 Z"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </pattern>
          )}
        </defs>

        <rect
          width="100%"
          height="100%"
          fill={`url(#${patternId})`}
        />
      </svg>
    );
  };

  // =====================================================
  // RETURN UI
  // =====================================================

  return (
    <Box
      sx={{
        bgcolor: "#FFFFFF",
        minHeight: "100vh",
        py: {
          xs: 4,
          md: 6,
        },
      }}
    >
      <Container maxWidth="lg">

        {/* =================================================
            HERO TITLE
        ================================================= */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            mb: 4,
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            fontWeight="800"
            color="#0F172A"
            sx={{
              letterSpacing: "-0.02em",
              mb: 1,
              fontSize: {
                xs: "2rem",
                md: "2.75rem",
              },
            }}
          >
            {t("home.dreamCareer")}
          </Typography>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <TrendingUp
              sx={{
                color: "#F59E0B",
                fontSize: 24,
              }}
            />

            <Typography
              variant="h6"
              fontWeight="500"
              color="#475569"
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
              }}
            >
              {t("home.trending")}
            </Typography>
          </Stack>
        </Box>

        {/* =================================================
            SWIPER
        ================================================= */}

        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "1100px",
            mx: "auto",
            mb: 7,
            borderRadius: 4,
            overflow: "hidden",

            "& .swiper-pagination": {
              bottom: "18px",
            },

            "& .swiper-pagination-bullet": {
              bgcolor:
                "rgba(255,255,255,0.55)",
              opacity: 1,
            },

            "& .swiper-pagination-bullet-active": {
              bgcolor: "#FFFFFF",
              width: 22,
              borderRadius: "8px",
            },
          }}
        >
          {/* =================================================
              PREVIOUS
          ================================================= */}

          <IconButton
            className="custom-prev"
            aria-label="Previous slide"
            sx={{
              position: "absolute",
              top: "50%",
              left: {
                xs: 8,
                md: 16,
              },
              transform:
                "translateY(-50%)",
              zIndex: 10,
              color: "#FFFFFF",
              bgcolor:
                "rgba(255,255,255,0.18)",

              "&:hover": {
                bgcolor:
                  "rgba(255,255,255,0.3)",
              },
            }}
          >
            <ChevronLeft
              sx={{
                fontSize: {
                  xs: 28,
                  md: 36,
                },
              }}
            />
          </IconButton>

          {/* =================================================
              NEXT
          ================================================= */}

          <IconButton
            className="custom-next"
            aria-label="Next slide"
            sx={{
              position: "absolute",
              top: "50%",
              right: {
                xs: 8,
                md: 16,
              },
              transform:
                "translateY(-50%)",
              zIndex: 10,
              color: "#FFFFFF",
              bgcolor:
                "rgba(255,255,255,0.18)",

              "&:hover": {
                bgcolor:
                  "rgba(255,255,255,0.3)",
              },
            }}
          >
            <ChevronRight
              sx={{
                fontSize: {
                  xs: 28,
                  md: 36,
                },
              }}
            />
          </IconButton>

          <Swiper
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            loop
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={slide.id}>
                <Box
                  sx={{
                    position: "relative",
                    height: {
                      xs: 260,
                      sm: 300,
                      md: 320,
                    },
                    width: "100%",
                    background:
                      slide.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Pattern */}

                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.15,
                    }}
                  >
                    {renderPattern(
                      slide.pattern,
                      index
                    )}
                  </Box>

                  {/* Slider Title */}

                  <Typography
                    variant="h3"
                    fontWeight="800"
                    color="#FFFFFF"
                    sx={{
                      position:
                        "relative",
                      zIndex: 1,
                      textAlign: "center",
                      px: {
                        xs: 6,
                        md: 10,
                      },
                      fontSize: {
                        xs: "1.8rem",
                        sm: "2.3rem",
                        md: "3rem",
                      },
                      lineHeight: 1.2,
                    }}
                  >
                    {slide.title}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {/* =================================================
            POPULAR CATEGORIES
        ================================================= */}

        <Box mb={7}>
          <Stack
            direction="row"
            spacing={1.2}
            flexWrap="wrap"
            useFlexGap
            alignItems="center"
            justifyContent="center"
          >
            <Typography
              variant="subtitle1"
              fontWeight="700"
              color="#334155"
              sx={{
                mr: 0.5,
              }}
            >
              {t("home.popularCategories") ||
                "Popular categories"}
              :
            </Typography>

            {categories.map((category) => {
              const isSelected =
                selectedCategory ===
                category;

              return (
                <Chip
                  key={category}
                  label={category}
                  onClick={() =>
                    setSelectedCategory(
                      isSelected
                        ? ""
                        : category
                    )
                  }
                  sx={{
                    borderRadius: "24px",
                    fontWeight: 500,
                    cursor: "pointer",
                    px: 1,
                    py: 2.2,

                    bgcolor: isSelected
                      ? "#008BDC"
                      : "#FFFFFF",

                    color: isSelected
                      ? "#FFFFFF"
                      : "#475569",

                    border: "1px solid",

                    borderColor:
                      isSelected
                        ? "#008BDC"
                        : "#E2E8F0",

                    transition:
                      "all 0.2s ease",

                    "&:hover": {
                      bgcolor:
                        isSelected
                          ? "#0073B7"
                          : "#F1F5F9",
                    },
                  }}
                />
              );
            })}
          </Stack>
        </Box>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <Box
            sx={{
              minHeight: 250,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress
              sx={{
                color: "#008BDC",
              }}
            />
          </Box>
        )}

        {/* =================================================
            CONTENT
        ================================================= */}

        {!loading && (
          <>
            {/* =============================================
                INTERNSHIPS
            ============================================= */}

            <Box mb={8}>
              <Typography
                variant="h5"
                fontWeight="800"
                color="#0F172A"
                mb={3}
                sx={{
                  fontSize: {
                    xs: "1.4rem",
                    md: "1.7rem",
                  },
                }}
              >
                {t("home.latestInternships") ||
                  "Latest Internships"}
              </Typography>

              {filteredInternships.length >
              0 ? (
                <Grid
                  container
                  spacing={3}
                >
                  {filteredInternships.map(
                    (internship, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        key={
                          internship._id ||
                          index
                        }
                      >
                        <ListingCard
                          item={internship}
                          type="internship"
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    border:
                      "1px solid #E2E8F0",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    color="#64748B"
                  >
                    {t(
                      "home.noInternships"
                    ) ||
                      "No internships found."}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* =============================================
                JOBS
            ============================================= */}

            <Box mb={8}>
              <Typography
                variant="h5"
                fontWeight="800"
                color="#0F172A"
                mb={3}
                sx={{
                  fontSize: {
                    xs: "1.4rem",
                    md: "1.7rem",
                  },
                }}
              >
                {t("home.latestJobs") ||
                  "Latest Jobs"}
              </Typography>

              {filteredJobs.length > 0 ? (
                <Grid
                  container
                  spacing={3}
                >
                  {filteredJobs.map(
                    (job, index) => (
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        lg={4}
                        key={
                          job._id || index
                        }
                      >
                        <ListingCard
                          item={job}
                          type="job"
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    border:
                      "1px solid #E2E8F0",
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    color="#64748B"
                  >
                    {t("home.noJobs") ||
                      "No jobs found."}
                  </Typography>
                </Box>
              )}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}



// import { useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Link as RouterLink } from "react-router-dom";

// import {
//   Box,
//   Container,
//   Typography,
//   Button,
//   Grid,
//   Card,
//   CardContent,
//   Chip,
//   Stack,
//   IconButton,
// } from "@mui/material";

// import {
//   CallMade as ArrowUpRight,
//   AccountBalanceWalletOutlined as Banknote,
//   CalendarTodayOutlined as Calendar,
//   ChevronRight,
//   ChevronLeft,
//   LocationOnOutlined as MapPin,
// } from "@mui/icons-material";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// import axios from "axios";

// const API_URL = "http://localhost:5000";

// export default function SvgSlider() {
//   const { t } = useTranslation();

//   // =========================
//   // SLIDER DATA
//   // =========================
//   const slides = [
//     {
//       pattern: "pattern-3",
//       title: t("home.growSkills"),
//       bgColor:
//         "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
//     },
//     {
//       pattern: "pattern-1",
//       title: t("home.startCareer"),
//       bgColor:
//         "linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)",
//     },
//     {
//       pattern: "pattern-2",
//       title: t("home.learnBest"),
//       bgColor:
//         "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
//     },
//     {
//       pattern: "pattern-4",
//       title: t("home.connectCompanies"),
//       bgColor:
//         "linear-gradient(135deg, #0D9488 0%, #115E59 100%)",
//     },
//   ];

//   // =========================
//   // STATE
//   // =========================
//   const [internships, setInternship] = useState([]);
//   const [jobs, setJob] = useState([]);

//   // =========================
//   // FETCH DATA
//   // =========================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [internshipRes, jobRes] = await Promise.all([
//           axios.get(`${API_URL}/api/internship`),
//           axios.get(`${API_URL}/api/job`),
//         ]);

//         setInternship(internshipRes.data);
//         setJob(jobRes.data);
//       } catch (error) {
//         console.error("Error fetching listings:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // =========================
//   // UI
//   // =========================
//   return (
//     <Box
//       sx={{
//         bgcolor: "#FFFFFF",
//         minHeight: "100vh",
//         py: 6,
//       }}
//     >
//       <Container maxWidth="lg">

//         {/* =========================
//             TITLE SECTION
//         ========================= */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             justifyContent: "center",
//             textAlign: "center",
//             mb: 4,
//             width: "100%",
//           }}
//         >
//           <Typography
//             variant="h3"
//             component="h1"
//             fontWeight="800"
//             color="#0F172A"
//             sx={{
//               letterSpacing: "-0.02em",
//               mb: 1,
//               fontSize: {
//                 xs: "2rem",
//                 md: "2.75rem",
//               },
//             }}
//           >
//             {t("home.dreamCareer")}
//           </Typography>

//           <Typography
//             variant="h6"
//             fontWeight="500"
//             color="#475569"
//             sx={{
//               fontSize: {
//                 xs: "1.1rem",
//                 md: "1.25rem",
//               },
//             }}
//           >
//             {t("home.trending")}
//           </Typography>
//         </Box>

//         {/* =========================
//             SWIPER SLIDER SECTION
//         ========================= */}
//         <Box
//           mb={8}
//           sx={{
//             position: "relative",
//             width: "100%",
//             maxWidth: "1100px",
//             mx: "auto",
//             borderRadius: 4,
//             overflow: "hidden",

//             "& .swiper-pagination-bullet": {
//               bgcolor: "rgba(255, 255, 255, 0.5)",
//               opacity: 1,
//             },

//             "& .swiper-pagination-bullet-active": {
//               bgcolor: "#008BDC",
//               width: 10,
//               height: 10,
//             },
//           }}
//         >

//           {/* Custom Navigation - Previous */}
//           <IconButton
//             className="custom-prev"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: 16,
//               transform: "translateY(-50%)",
//               zIndex: 10,
//               color: "#008BDC",
//               bgcolor: "rgba(255, 255, 255, 0.2)",

//               "&:hover": {
//                 bgcolor: "rgba(255, 255, 255, 0.4)",
//               },
//             }}
//           >
//             <ChevronLeft sx={{ fontSize: 36 }} />
//           </IconButton>

//           {/* Custom Navigation - Next */}
//           <IconButton
//             className="custom-next"
//             sx={{
//               position: "absolute",
//               top: "50%",
//               right: 16,
//               transform: "translateY(-50%)",
//               zIndex: 10,
//               color: "#008BDC",
//               bgcolor: "rgba(255, 255, 255, 0.2)",

//               "&:hover": {
//                 bgcolor: "rgba(255, 255, 255, 0.4)",
//               },
//             }}
//           >
//             <ChevronRight sx={{ fontSize: 36 }} />
//           </IconButton>

//           <Swiper
//             modules={[
//               Navigation,
//               Pagination,
//               Autoplay,
//             ]}
//             spaceBetween={0}
//             slidesPerView={1}
//             navigation={{
//               prevEl: ".custom-prev",
//               nextEl: ".custom-next",
//             }}
//             pagination={{
//               clickable: true,
//             }}
//             autoplay={{
//               delay: 4000,
//             }}
//           >
//             {slides.map((slide, index) => (
//               <SwiperSlide key={index}>
//                 <Box
//                   sx={{
//                     position: "relative",
//                     height: {
//                       xs: 300,
//                       md: 280,
//                     },
//                     width: "100%",
//                     background: slide.bgColor,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     mt: 4,
//                     mb: 4,
//                   }}
//                 >

//                   {/* Pattern Background */}
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       inset: 0,
//                       opacity: 0.15,
//                     }}
//                   >
//                     <svg
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                       }}
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <pattern
//                         id={`grid-pattern-${index}`}
//                         x="0"
//                         y="0"
//                         width="30"
//                         height="30"
//                         patternUnits="userSpaceOnUse"
//                       >
//                         <path
//                           d="M 30 0 L 0 0 0 30"
//                           fill="none"
//                           stroke="white"
//                           strokeWidth="2"
//                         />
//                       </pattern>

//                       <rect
//                         x="0"
//                         y="0"
//                         width="100%"
//                         height="100%"
//                         fill={`url(#grid-pattern-${index})`}
//                       />
//                     </svg>
//                   </Box>

//                   <Typography
//                     variant="h3"
//                     fontWeight="800"
//                     color="white"
//                     sx={{
//                       position: "relative",
//                       zIndex: 1,
//                       textAlign: "center",
//                       px: 3,
//                       fontSize: {
//                         xs: "2rem",
//                         md: "3rem",
//                       },
//                     }}
//                   >
//                     {slide.title}
//                   </Typography>
//                 </Box>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Box>

//         {/* =========================
//             INTERNSHIP GRID
//         ========================= */}
//         <Grid
//           container
//           spacing={3}
//           mb={8}
//         >
//           {internships.map((internship, index) => (
//             <Grid
//               item
//               xs={12}
//               md={6}
//               lg={4}
//               key={internship._id || index}
//             >
//               <Card
//                 elevation={0}
//                 sx={{
//                   borderRadius: 3,
//                   border: "1px solid #E2E8F0",
//                   bgcolor: "#FFFFFF",
//                   height: "100%",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "space-between",
//                   transition: "all 0.2s ease",

//                   "&:hover": {
//                     boxShadow:
//                       "0 10px 20px -5px rgba(0, 0, 0, 0.08)",
//                   },
//                 }}
//               >
//                 <CardContent sx={{ p: 3 }}>

//                   {/* =========================
//                       ACTIVELY HIRING
//                   ========================= */}
//                   <Stack
//                     direction="row"
//                     alignItems="center"
//                     spacing={0.5}
//                     sx={{
//                       bgcolor: "#E0F2FE",
//                       color: "#0369A1",
//                       px: 1.2,
//                       py: 0.4,
//                       borderRadius: "4px",
//                       width: "fit-content",
//                       mb: 2,
//                     }}
//                   >
//                     <ArrowUpRight
//                       sx={{ fontSize: 16 }}
//                     />

//                     <Typography
//                       variant="caption"
//                       fontWeight="700"
//                     >
//                       {t("home.activelyHiring")}
//                     </Typography>
//                   </Stack>

//                   {/* =========================
//                       INTERNSHIP TITLE
//                   ========================= */}
//                   <Typography
//                     variant="h6"
//                     fontWeight="700"
//                     color="#0F172A"
//                     mb={0.5}
//                   >
//                     {internship.title}
//                   </Typography>

//                   {/* =========================
//                       COMPANY
//                   ========================= */}
//                   <Typography
//                     variant="body2"
//                     fontWeight="500"
//                     color="#64748B"
//                     mb={2}
//                   >
//                     {internship.company}
//                   </Typography>

//                   {/* =========================
//                       DETAILS
//                   ========================= */}
//                   <Stack
//                     spacing={1.5}
//                     color="#475569"
//                     mb={3}
//                   >

//                     {/* Location */}
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={1}
//                     >
//                       <MapPin
//                         sx={{
//                           fontSize: 18,
//                           color: "#94A3B8",
//                         }}
//                       />

//                       <Typography variant="body2">
//                         {internship.location}
//                       </Typography>
//                     </Stack>

//                     {/* Stipend */}
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={1}
//                     >
//                       <Banknote
//                         sx={{
//                           fontSize: 18,
//                           color: "#94A3B8",
//                         }}
//                       />

//                       <Typography variant="body2">
//                         {internship.stipend
//                           ? `₹ ${internship.stipend}`
//                           : t("home.tbd")}
//                       </Typography>
//                     </Stack>

//                     {/* Date / Duration */}
//                     <Stack
//                       direction="row"
//                       alignItems="center"
//                       spacing={1}
//                     >
//                       <Calendar
//                         sx={{
//                           fontSize: 18,
//                           color: "#94A3B8",
//                         }}
//                       />

//                       <Typography variant="body2">
//                         {internship.startDate ||
//                           internship.duration ||
//                           t("home.immediate")}
//                       </Typography>
//                     </Stack>
//                   </Stack>

//                   {/* =========================
//                       FOOTER
//                   ========================= */}
//                   <Stack
//                     direction="row"
//                     justifyContent="space-between"
//                     alignItems="center"
//                     pt={2}
//                     borderTop="1px solid #F1F5F9"
//                   >

//                     {/* Internship Chip */}
//                     <Chip
//                       label={t("home.internship")}
//                       size="small"
//                       sx={{
//                         bgcolor: "#F1F5F9",
//                         color: "#475569",
//                         fontWeight: 600,
//                       }}
//                     />

//                     {/* View Details */}
//                     <Button
//                       component={RouterLink}
//                       to={`/detailinternship/${internship._id}`}
//                       sx={{
//                         color: "#008BDC",
//                         textTransform: "none",
//                         fontWeight: 700,
//                       }}
//                       endIcon={<ChevronRight />}
//                     >
//                       {t("home.viewDetails")}
//                     </Button>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

