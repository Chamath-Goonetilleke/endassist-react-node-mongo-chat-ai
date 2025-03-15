import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import EmailSend from "../components/forgotPassword/EmailSend";
import VerifyOTP from "../components/forgotPassword/VerifyOTP";
import NewPassword from "../components/forgotPassword/NewPassword";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [isEmailSent, setIsEmailSent] = useState(true);
  const [isVerified, setIsVerified] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
      {!isEmailSent && !isVerified && (
        <EmailSend
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}
      {isEmailSent && !isVerified && (
        <VerifyOTP
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}
      {isEmailSent && isVerified && (
        <NewPassword
          formData={formData}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      )}
    </Container>
  );
}
