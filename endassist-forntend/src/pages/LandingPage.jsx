import { Box, Button } from '@mui/material'
import React from 'react'
import Layout from '../components/common/Layout';
import ImageContentCard from '../components/landingPage/ImageContentCard';

export default function LandingPage() {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%" }}>
        <img
          src="/assets/images/landing-banner.png"
          alt="landing banner"
          style={{ width: "100%", display: "block", maxHeight: "60vh" }}
        />
        <Box
          sx={{
            position: "absolute",
            top: { xs: "65%", md: "70%" },
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: { xs: "15px", md: "40px" },
            fontWeight: "bold",
            textAlign: "center",
            backgroundColor: "#FCE5F8",
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Empower Your Endometriosis Journey Today
          <Box
            sx={{
              fontSize: { xs: "12px", md: "32px" },
              fontWeight: "normal",
              pt: { xs: "12px", md: "32px" },
            }}
          >
            Join our community and discover personalized solutions for managing
            your endometriosis effectively.
          </Box>
        </Box>
      </Box>

      <Layout>
        <Box
          sx={{
            width: "100%",
            height: { xs: "200px", md: "300px" },
            my: "1rem",
            borderRadius: "25px",
            background: "linear-gradient(to right, #DDCEFF, #008080)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              mb: { xs: "1rem", md: "2rem" },
              fontSize: { xs: "13px", md: "24px" },
              fontWeight: "bold",
              maxWidth: { xs: "65%", md: "50%" },
              textAlign: "center",
              lineHeight: { xs: "1.5rem", md: "3rem" },
            }}
          >
            Our web application enhances your quality of life by offering
            tailored support. Experience personalized care and connect with a
            community that understands your journey.
          </Box>
          <Button
            variant="contained"
            color="success"
            sx={{
              width: { xs: "100px", md: "150px" },
              height: { xs: "30px", md: "50px" },
            }}
          >
            Log In
          </Button>
        </Box>

        <Box
          sx={{
            mt:"2rem",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 3,
            width: "100%",
            mb: "200px",
          }}
        >
          <ImageContentCard
            img={"/assets/images/land1.png"}
            heading={"Personalized care"}
            text={"Get expert hygiene tips and product recommendations and nutrition support to maintain your well-being. Stay informed about the best practices for managing your health with ease."}
          />
          <ImageContentCard
            img={"/assets/images/land2.png"}
            heading={"Diagnosis"}
            text={
              "Receive symptom analysis and insights to understand your condition better. Our intelligent diagnosis system helps you track and assess your health for better decision-making."}
          />
          <ImageContentCard
            img={"/assets/images/land3.png"}
            heading={"Dietary Plan"}
            text={
              "Make your own dietary plan with the help of EndOAssist. Best foods to support your well-being and improve your lifestyle."
            }
          />
        </Box>
      </Layout>
    </Box>
  );
}
