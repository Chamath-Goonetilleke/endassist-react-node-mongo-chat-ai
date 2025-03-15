import { Box, Button, TextField, Typography } from '@mui/material';
import React from 'react'
import { NavLink } from 'react-router-dom';

export default function EmailSend({ formData, handleSubmit, handleChange }) {
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
        Enter the email address you used to create your account.
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

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2, bgcolor: "#2a6d66", color: "white" }}
          type="submit"
        >
          Recover
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
        <NavLink
          to={"/login"}
          style={{
            textDecoration: "none",
            color: "#008080",
          }}
        >
          <Typography>
            <b>Back to Log in</b>
          </Typography>
        </NavLink>
      </Box>
    </Box>
  );
}
