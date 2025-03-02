import { Box, Typography } from '@mui/material'
import React from 'react'
import Layout from '../components/common/Layout';

export default function HomePage() {
  return (
    <Box sx={{ m: "3rem" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box
          sx={{
            ml: { xs: "0rem", md: "2rem" },
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", md: "20%" },
            height: { xs: "80%" },
          }}
        >
          <img
            src="/assets/images/home-banner.png"
            alt="home-banner"
            style={{ width: "100vh", maxHeight: "60vh" }}
          />
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "60%" },
            height: { xs: "250px", md: "400px" },
            my: "1rem",
            borderRadius: "100px 0px 100px 100px",
            background: "linear-gradient(to bottom, #DDCEFF, #008080)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "18px", md: "38px" },
              mb: { xs: "0.8rem", md: "2rem" },
            }}
            fontWeight="bold"
          >
            Welcome to EndoAssist! 🌸
          </Typography>
          <Typography
            sx={{ mx: "2rem", fontSize: { xs: "15px", md: "23px" } }}
            textAlign="center"
          >
            “ Take control of your health with tailored hygiene tips,
            nutritional guidance, and symptom insights designed just for you.
            Let’s make your journey toward comfort and care a little easier. “
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: "3rem" }}>
        <Box
          sx={{
            backgroundColor: "#E4AFAF",
            mx: { xs: "", md: "10rem" },
            my: { xs: "", md: "4rem" },
            px: { xs: "1rem", md: "6rem" },
            py: { xs: "1rem", md: "4rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: { xs: "0.8rem", md: "3rem" },
            }}
          >
            <Box sx={{ width: { xs: "40%", md: "25%" } }}>
              <img
                src="/assets/images/home-1.png"
                alt="sanitary"
                width={"100%"}
              />
            </Box>
            <Typography
              sx={{
                ml: { xs: "2rem", md: "6rem" },
                fontSize: { xs: "15px", md: "28px" },
              }}
            >
              Personalized Care
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: { xs: "1rem", md: "3rem" },
            }}
          >
            <Box sx={{ width: { xs: "40%", md: "25%" } }}>
              <img
                src="/assets/images/home-2.png"
                alt="sanitary"
                width={"100%"}
              />
            </Box>
            <Typography
              sx={{
                ml: { xs: "2rem", md: "6rem" },
                fontSize: { xs: "15px", md: "28px" },
              }}
            >
              Make your own Dietary plan
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: { xs: "", md: "1rem" },
            }}
          >
            <Box sx={{ width: { xs: "40%", md: "25%" } }}>
              <img
                src="/assets/images/home-3.png"
                alt="sanitary"
                width={"100%"}
              />
            </Box>
            <Typography
              sx={{
                ml: { xs: "2rem", md: "6rem" },
                fontSize: { xs: "15px", md: "28px" },
              }}
            >
              Endometriosis Diagnosis
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          mb: { xs: "", md: "3rem" },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "23px" },
          }}
          textAlign="center"
        >
          "Endometriosis is a chronic condition where tissue similar to the
          uterus lining grows outside the uterus, causing pain, heavy bleeding,
          and discomfort. While managing it can be challenging, with the right
          care and support, you can take control of your health. Remember,
          you’re not alone—small steps can make a big difference in your
          journey." 🌸
        </Typography>
        <Box>
          <img src="/assets/images/home-4.png" alt="sanitary" />
        </Box>
      </Box>
    </Box>
  );
}
