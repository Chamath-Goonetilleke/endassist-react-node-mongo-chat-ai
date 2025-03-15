import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, ArrowBack } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function LoginPage() {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User logged in:", formData);
    login(formData);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            variant="outlined"
            type="email"
            name="email"
            sx={{ backgroundColor: "white" }}
            value={formData.email}
            onChange={handleChange}
          />
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
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <NavLink
              to={"/forgot-password"}
              style={{
                textDecoration: "none",
                color: "#008080",
              }}
            >
              <b>Forgot Password</b>
            </NavLink>
          </Box>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2, bgcolor: "#2a6d66", color: "white" }}
            type="submit"
          >
            Login
          </Button>
        </form>

        <Typography align="center" sx={{ mt: 2 }}>
          OR
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
            mx: { xs: "15%", md: "25%" },
          }}
        >
          <Typography>
            <b>Don't have an account?</b>
          </Typography>
          <Button
            onClick={() => navigate("/register")}
            sx={{ textTransform: "none", fontWeight: "bold" }}
          >
            {" "}
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
