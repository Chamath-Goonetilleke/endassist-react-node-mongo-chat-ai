import { Box, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <Box>
      <Box sx={{ backgroundColor: "#008080", py: "2rem" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            m: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
            pr: { md: "3rem" },
          }}
        >
          <Box>
            <img src="/assets/logo/logo.png" alt="" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
            >
              Site Map
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "1rem",
                mb: { xs: "2rem" },
              }}
            >
              <NavLink
                to={"/"}
                style={{
                  textDecoration: "underline",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Home
              </NavLink>
              <NavLink
                to={"/edu-resource"}
                style={{
                  textDecoration: "underline",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Educational Resources
              </NavLink>
              <NavLink
                to={"/personalized-care"}
                style={{
                  textDecoration: "underline",
                  color: "white",
                  fontSize: "18px",
                }}
              >
                Personalized Care
              </NavLink>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Box sx={{ display: "flex", gap: "2rem" }}>
              <img src="/assets/logo/Facebook.png" alt="" />
              <img src="/assets/logo/Instagram.png" alt="" />
            </Box>
            <Typography
              sx={{
                color: "white",
                fontSize: {
                  xs: "18px",
                  md: "18px",
                },
              }}
            >
              Join Our Community
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt:{xs:"2rem"},
            color: "white",
            fontSize: {
              xs: "",
              md: "15px",
            },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{}} gutterBottom>
            Empowering Women’s Health & Wellness.
          </Typography>
          <span>&copy; 2025 All rights reserved.</span>
        </Box>
      </Box>
    </Box>
  );
}
