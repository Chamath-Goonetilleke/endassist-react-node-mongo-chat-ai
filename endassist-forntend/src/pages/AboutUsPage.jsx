import React from "react";
import { Container, Typography, Box, Grid, useMediaQuery } from "@mui/material";
import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export default function AboutUsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container sx={{ py: 4 }}>
      {/* Heading Section */}
      <Box textAlign="justify" mb={4}>
        <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
          Welcome to EndoAssist – Empowering Women’s Health & Wellness
        </Typography>
        <Typography variant="body1" mt={1}>
          At <strong>EndoAssist</strong>, we are dedicated to providing
          personalized support for women's health. Our platform helps women
          manage their well-being with expert-backed insights, smart
          recommendations, and user-friendly tools.
        </Typography>
      </Box>

      {/* What We Offer Section */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          What We Offer
        </Typography>
        {[
          "Hygiene Tips & Product Recommendation – Get tailored hygiene tips and product suggestions based on your personal needs and symptoms.",
          "Diagnosis Assistance – Identify potential health concerns through a symptom-based assessment and get guidance on the next steps.",
          "Diet Choice – Discover the best nutrition options for your symptoms and overall wellness, helping you maintain a healthy lifestyle.",
        ].map((item, index) => (
          <Box display="flex" alignItems="center" key={index} mb={1}>
            <FiberManualRecord sx={{ fontSize: 10, color: "#1976D2", mr: 1 }} />
            <Typography variant="body1">{item}</Typography>
          </Box>
        ))}
      </Box>

      {/* Why Choose Us Section */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Why Choose Us?
        </Typography>
        {[
          "User-Centric Approach – Designed to be simple, intuitive, and accessible for every woman.",
          "Science-Based Recommendations – Backed by medical research and expert insights.",
          "Privacy & Security – Your health information remains safe and confidential.",
          "Accessible Anytime, Anywhere – Easy-to-use, designed for women from all walks of life.",
        ].map((item, index) => (
          <Box display="flex" alignItems="center" key={index} mb={1}>
            <CheckCircle sx={{ fontSize: 20, color: "#4CAF50", mr: 1 }} />
            <Typography variant="body1">{item}</Typography>
          </Box>
        ))}
      </Box>

      {/* Closing Statement */}
      <Box textAlign="justify">
        <Typography variant="h6" fontWeight="bold">
          Join Us on the Journey to Better Health!
        </Typography>
        <Typography variant="body1" mt={1}>
          Take control of your well-being today with <strong>EndoAssist</strong>
          . Together, we empower women to live healthier, happier lives!
        </Typography>
      </Box>
    </Container>
  );
}
