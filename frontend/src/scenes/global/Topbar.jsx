import {
  Box,
  IconButton,
  useTheme,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";

const Topbar = ({ handleLogout }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate(); // Hook navigate de React Route
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileNavigation = () => {
    navigate("/profile"); // Naviguer vers l'URL /profile
    handleClose(); // Fermer le menu après la navigation
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex" justifyContent="right" p={2}>
      {/* SEARCH BAR */}


      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={handleClick}>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfileNavigation}>
          <PersonOutlinedIcon />
          Profile
        </MenuItem>

        <Divider />
        <MenuItem onClick={handleLogout}>
          <LockOutlinedIcon />
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Topbar;
