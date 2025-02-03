import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Collapse } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import TourOutlinedIcon from '@mui/icons-material/TourOutlined';
import SouthAmericaOutlinedIcon from '@mui/icons-material/SouthAmericaOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

const Item = ({ title, to, icon, selected, setSelected, color }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: selected === title ? "#4db6ac" : colors.grey[100], // Change color on selection
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography style={{ color }}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [isDataOpen, setIsDataOpen] = useState(false);
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isActivitesOpen, setIsActivitesOpen] = useState(false);
  const [isChartsOpen, setIsChartsOpen] = useState(false);
  const [isBonDeCommandeOpen, setIsBonDeCommandeOpen] = useState(false);
  const [name] = useState(localStorage.getItem('name'));
  const [role] = useState(localStorage.getItem('role'));
  const [username] = useState(localStorage.getItem('username'));
  const [image] = useState(localStorage.getItem('image'));

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="right"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={image}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {name} {username}
                </Typography>
                <Typography variant="h5" color="#4db6ac">
                  {role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            
            <MenuItem
              onClick={() => setIsDataOpen(!isDataOpen)}
              style={{ color: "#4db6ac" }}
            >
              <Typography>Data</Typography>            
            </MenuItem>
            <Collapse in={isDataOpen} timeout="auto" unmountOnExit>
              <Box pl={4}>
                <Item
                  title="Users"
                  to="/ListUser"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Collapse>

            <MenuItem
              onClick={() => setIsPagesOpen(!isPagesOpen)}
              style={{ color: "#4db6ac" }}
            >
              <Typography>Pages</Typography>
            </MenuItem>
            <Collapse in={isPagesOpen} timeout="auto" unmountOnExit>
              <Box pl={4}>
                <Item
                  title="Livraison"
                  to="/addliv"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Liste des Livraisons"
                  to="/listliv"
                  icon={<CalendarTodayOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </Box>
            </Collapse>

           
             

            <MenuItem
              onClick={() => setIsChartsOpen(!isChartsOpen)}
              style={{ color: "#4db6ac" }}
            >
              <Typography>Files</Typography>            
            </MenuItem>
            <Collapse in={isChartsOpen} timeout="auto" unmountOnExit>
              <Box pl={4}>
                <Item
                  title="Région"
                  to="/ListRegion"
                  icon={<SouthAmericaOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gouvernement"
                  to="/ListGouvernement"
                  icon={<BusinessOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Rue"
                  to="/ListeRues"
                  icon={<BusinessOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />


                
              </Box>
            </Collapse>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
