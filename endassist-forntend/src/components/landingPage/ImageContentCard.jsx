import { Box } from '@mui/material';
import React from 'react'

export default function ImageContentCard({heading, text, img}) {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <img
        src={img}
        alt="landing banner"
        style={{ width: "100%", display: "block", maxHeight: "60vh" }}
      />
      <Box
        sx={{
          width: "80%",
          position: "absolute",
          top: { xs: "280%", md: "120%" },
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "black",
          fontSize: { xs: "12px", md: "18px" },
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#FCE5F8",
          padding: "10px 20px",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "190px",
        }}
      >
        {heading}
        <Box
          sx={{
            width: "80%",
            fontSize: { xs: "12px", md: "16px" },
            fontWeight: "normal",
            textAlign: "justify",
            pt: { xs: "12px", md: "20px" },
          }}
        >
          {text}
        </Box>
      </Box>
    </Box>
  );
}
