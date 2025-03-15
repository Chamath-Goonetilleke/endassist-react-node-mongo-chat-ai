import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ChatAssistant from "../pages/ChatAssistantPage";
import { NavLink } from "react-router-dom";

export default function ChatDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: {xs:360, md:500}, height: '100vh',}}
      role="presentation"
    >
      <ChatAssistant />
    </Box>
  );

  return (
    <div>
      <NavLink
        onClick={toggleDrawer(true)}
        style={{ fontWeight: "normal", color: "black", textDecoration: "none" }}
      >
        Diagnosis
      </NavLink>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
    </div>
  );
}
