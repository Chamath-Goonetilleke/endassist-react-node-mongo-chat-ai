import { Box, Typography } from '@mui/material';
import React from 'react'
import { useAuth } from '../context/AuthProvider';

export default function DiagnosePage() {
      const { user } = useAuth();
    
  if (!user) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          src="/assets/images/land2.png"
          alt="landing banner"
          style={{
            width: "100%",
            display: "block",
            maxHeight: "100%",
            opacity: 0.2,
          }}
        />
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ position: "absolute" }}
        >
          Please log in to access diagnosis assistance
        </Typography>
      </Box>
    );
  }
}
