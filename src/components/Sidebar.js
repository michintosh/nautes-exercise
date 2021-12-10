import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { NavLink, useLocation } from "react-router-dom";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';

import Logo from "./Logo";

function Sidebar() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "15%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "secondary.main",
      }}
    >
      <Logo />
      <MenuList>
        <MenuItem component={NavLink} to="/" sx={{
          color: location.pathname == "/" ? "white" : "darkgrey",
          padding:"1rem",
          backgroundColor: location.pathname == "/" ? "secondary.dark" :"secondary.main" ,
          borderLeft: location.pathname == "/" ? "5px red solid" : "5px transparent solid"
        }}>
          <ListItemIcon>
            <BusinessCenterIcon sx={{color: location.pathname == "/" ? "white" : "darkgrey",}} fontSize="small" />
          </ListItemIcon>
          <Typography component="small" variant="inherit">Attività da completare</Typography>
        </MenuItem>
        <MenuItem component={NavLink} to="/done" sx={{
          color: location.pathname == "/done" ? "white" : "darkgrey",
          padding:"1rem",
          backgroundColor: location.pathname == "/done" ? "secondary.dark" :"secondary.main" ,
          borderLeft: location.pathname == "/done" ? "5px red solid" : "5px transparent solid"
        }}>
          <ListItemIcon>
            <AssignmentIcon sx={{color: location.pathname == "/done" ? "white" : "darkgrey",}} fontSize="small" />
          </ListItemIcon>
          <Typography component="small" variant="inherit">Attività completate</Typography>
        </MenuItem>
      </MenuList>

    </Box>
  );
}

export default Sidebar;
