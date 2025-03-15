import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
export default function NewPassword({ formData, handleSubmit, handleChange }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
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
        Recover Your Password
      </Typography>

      <Typography variant="body1" align="center" mt="2rem">
        Enter a new password to reset your password.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          variant="outlined"
          sx={{ backgroundColor: "white" }}
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#2a6d66", color: "white" }}
          type="submit"
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
}
