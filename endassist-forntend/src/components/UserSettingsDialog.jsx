import * as React from "react";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../context/AuthProvider";

export default function UserSettingsDialog({ open, handleClose }) {
  const { user, updateUserProfile, deleteAccount } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
  });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (user) {
        console.log(user)
      setFormData({
        name: user.name || "",
        dateOfBirth: user.dob || "",
      });
    }
  }, [user, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      handleClose();
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      handleClose();
    } catch (error) {
      console.error("Failed to delete account:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div">
          Edit Profile
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Avatar
              src={user?.avatarUrl || "/static/images/avatar/2.jpg"}
              alt={user?.name || "User"}
              sx={{ width: 80, height: 80 }}
            />
            <Button variant="outlined" color="primary">
              Change
            </Button>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
              User name
            </Typography>
            <TextField
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: "#f0f0f0" }}
            />
          </Box>

          <Box sx={{ width: "100%", mb: 2 }}>
            <Typography variant="subtitle1" component="div" sx={{ mb: 1 }}>
              Date of birth
            </Typography>
            <TextField
              fullWidth
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              variant="outlined"
              sx={{ bgcolor: "#f0f0f0" }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                bgcolor: "#2a8580",
                "&:hover": { bgcolor: "#1e6b67" },
                py: 1,
                px: 4,
              }}
            >
              Save
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 5, mb: 2 }}>
          {showDeleteConfirm ? (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="body1" color="error">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDeleteAccount}
                >
                  Confirm Delete
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Button
              variant="text"
              color="error"
              onClick={() => setShowDeleteConfirm(true)}
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                textTransform: "none",
              }}
              startIcon={<DeleteIcon />}
            >
              Delete Account
            </Button>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
