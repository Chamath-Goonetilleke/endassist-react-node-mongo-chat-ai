import React, { useState } from "react";
import { Container } from "@mui/material";
import EmailSend from "../components/forgotPassword/EmailSend";
import VerifyOTP from "../components/forgotPassword/VerifyOTP";
import NewPassword from "../components/forgotPassword/NewPassword";
import { SendOTPMail, updatePassword, VerifyOtp } from "../services/userService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({
    email: "",
    otp:"", 
    password:""
  });

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigator = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    await SendOTPMail(formData.email)
      .then(({ data }) => {
        if (data.success) {
          toast.success(data.message);
          setIsEmailSent(true);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resend = ()=>{
    setIsEmailSent(false);
  }

  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    await VerifyOtp(formData.email, formData.otp)
      .then(({ data }) => {
        if (data.success) {
          toast.success("Verified");
          setIsVerified(true);
        } else {
          toast.error("Invalid OTP");
        }
      })
      .catch((err) => {
        console.log(err);
      });
}

const handleSubmitPassword = async (e) => {
    e.preventDefault();

    await updatePassword({ email: formData.email, password: formData.password })
      .then(({ data }) => {
        toast.success(data);
        navigator("/login")
      })
      .catch((err) => {
        console.log(err);
      });
}

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
          handleSubmit={handleSubmitEmail}
          handleChange={handleChange}
        />
      )}
      {isEmailSent && !isVerified && (
        <VerifyOTP
          formData={formData}
          handleSubmit={handleSubmitOTP}
          handleChange={handleChange}
          resend={resend}
        />
      )}
      {isEmailSent && isVerified && (
        <NewPassword
          formData={formData}
          handleSubmit={handleSubmitPassword}
          handleChange={handleChange}
        />
      )}
    </Container>
  );
}
