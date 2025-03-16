import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

export default function VerifyOTP({
  formData,
  handleSubmit,
  handleChange,
  resend,
}) {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#E6DBFF",
        color: "#008080",
        p: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
        Enter the code
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Code"
          variant="outlined"
          type="number"
          name="otp"
          sx={{ backgroundColor: "white" }}
          value={formData.otp}
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#2a6d66", color: "white" }}
          type="submit"
        >
          Continue
        </Button>
      </form>

      <Typography align="center" sx={{ mt: 2 }}>
        OR
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
        }}
      >
        <Button sx={{ color: "#008080" }} onClick={resend}>
          <b>Resend Code</b>
        </Button>
      </Box>
    </Box>
  );
}
