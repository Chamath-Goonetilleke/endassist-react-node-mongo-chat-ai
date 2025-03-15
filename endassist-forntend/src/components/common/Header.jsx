import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Divider } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ChatDrawer from "../ChatDrawer";
import UserSettingsDialog from "../UserSettingsDialog"; // Import the new component

const pages = [
  { name: "Home", url: "/" },
  { name: "Personalized Care", url: "/personalized-care" },
  { name: "Dietary Plan", url: "/dietary-plan" },
  { name: "Diagnosis", url: "/diagnosis" },
  { name: "Educational Resources", url: "/edu-resource" },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedPage, setSelectedPage] = useState(pages[0].name);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenSettings = () => {
    handleCloseUserMenu();
    setSettingsDialogOpen(true);
  };

  const handleCloseSettings = () => {
    setSettingsDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "white" }}>
        <Container sx={{ backgroundColor: "white", minWidth: "100%" }}>
          <Toolbar
            disableGutters
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img
                src="/assets/logo/logo.png"
                alt="logo"
                style={{ maxWidth: "200px" }}
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page, index) => {
                  if (page.name !== "Diagnosis") {
                    return (
                      <MenuItem key={index}>
                        <NavLink
                          to={page.url}
                          onClick={() => {
                            setSelectedPage(page.name);
                            handleCloseNavMenu();
                          }}
                          style={{
                            textDecoration:
                              page.name === selectedPage ? "underline" : "none",
                            textDecorationThickness:
                              page.name === selectedPage ? "4px" : "none",
                            textDecorationColor:
                              page.name === selectedPage ? "#008080" : "none",
                            textUnderlineOffset: "5px",
                            color: "black",
                            fontWeight:
                              page.name === selectedPage ? "bold" : "normal",
                          }}
                        >
                          {page.name}
                        </NavLink>
                      </MenuItem>
                    );
                  } else {
                    return (
                      <MenuItem key={index}>
                        <ChatDrawer />
                      </MenuItem>
                    );
                  }
                })}
                {!user && (
                  <>
                    <Button
                      sx={{ m: 1, width: "90%" }}
                      variant="outlined"
                      color="success"
                      onClick={() => navigate("/login")}
                    >
                      Log In
                    </Button>
                    <br />
                    <Button
                      sx={{ mx: 1, width: "90%" }}
                      variant="contained"
                      color="success"
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </Button>
                  </>
                )}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img
                src="/assets/logo/logo.png"
                alt="logo"
                style={{ maxWidth: "200px" }}
              />
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            ></Typography>

            <center>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex" },
                  gap: { md: 5 },
                }}
              >
                {pages.map((page, index) => {
                  if (page.name !== "Diagnosis") {
                    return (
                      <NavLink
                        key={index}
                        to={page.url}
                        onClick={() => setSelectedPage(page.name)}
                        style={{
                          textDecoration:
                            page.name === selectedPage ? "underline" : "none",
                          textDecorationThickness:
                            page.name === selectedPage ? "4px" : "none",
                          textDecorationColor:
                            page.name === selectedPage ? "#008080" : "none",
                          textUnderlineOffset: "5px",
                          color: "black",
                          fontWeight:
                            page.name === selectedPage ? "bold" : "normal",
                        }}
                      >
                        {page.name}
                      </NavLink>
                    );
                  } else {
                    return <ChatDrawer key={index} />;
                  }
                })}
              </Box>
            </center>
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={user.name}
                      src={user.avatarUrl || "/static/images/avatar/2.jpg"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      {user ? user.name : ""}
                    </Typography>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleOpenSettings}>
                    <SettingsIcon sx={{ mr: "1.5rem" }} />
                    <Typography textAlign="center">Settings</Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleCloseUserMenu();
                    }}
                  >
                    <LogoutIcon sx={{ mr: "1.5rem" }} />
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  flexDirection: "row",
                  gap: 2,
                  my: "1rem",
                  ml: { xs: "0rem", md: "5rem" },
                }}
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <UserSettingsDialog open={settingsDialogOpen} handleClose={handleCloseSettings} />
    </>
  );
}
