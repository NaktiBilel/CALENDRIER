import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SouthAmericaOutlinedIcon from "@mui/icons-material/SouthAmericaOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Groups2OutlinedIcon from "@mui/icons-material/Groups2Outlined";
import ReactToPrint from "react-to-print";
import axios from "axios";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State definitions
  const [reunions, setReunions] = useState([]);
  const [banques, setBanques] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [secteurs, setSecteurs] = useState([]);
  const [taches, setTaches] = useState([]);
  const [visites, setVisites] = useState([]);
  const [regions, setRegions] = useState([]);
  const [totalCountUser, setTotalCountUser] = useState(0);
  const [totalCountBanque, setTotalCountBanque] = useState(0);
  const [totalCountClient, setTotalCountClient] = useState(0);
  const [totalCountSecteur, setTotalCountSecteur] = useState(0);
  const [totalCountVisite, setTotalCountVisite] = useState(0);
  const [totalCountReunion, setTotalCountReunion] = useState(0);
  const [totalCountTache, setTotalCountTache] = useState(0);
  const [totalCountRegion, setTotalCountRegion] = useState(0);
  const [error, setError] = useState(null);

  const componentRef = useRef();

  useEffect(() => {
    const fetchData = async (url, setState, setCount) => {
      try {
        const response = await axios.get(url);
        setState(response.data.data);
        setCount(response.data.totalCount);
      } catch (error) {
        setError(error);
      }
    };

    fetchData("http://localhost:3002/users/get", setUsers, setTotalCountUser);
    fetchData("http://localhost:3002/regions/get", setRegions, setTotalCountRegion);
    fetchData("http://localhost:3002/banques/get", setBanques, setTotalCountBanque);
    fetchData("http://localhost:3002/taches/get", setTaches, setTotalCountTache);
    fetchData("http://localhost:3002/secteurs/get", setSecteurs, setTotalCountSecteur);
    fetchData("http://localhost:3002/visites/get", setVisites, setTotalCountVisite);
    fetchData("http://localhost:3002/reunions/get", setReunions, setTotalCountReunion);
    fetchData("http://localhost:3002/clients/get", setClients, setTotalCountClient);
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <Box m="20px" ref={componentRef}>
      {/* HEADER */}
      <Box display="flex" flexDirection="column" alignItems="center" mb="20px">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        <ReactToPrint
          trigger={() => (
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "12px", // Smaller font size
                fontWeight: "bold",
                padding: "8px 16px", // Smaller padding
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "8px", fontSize: "20px" }} /> {/* Smaller icon */}
              Download Reports
            </Button>
          )}
          content={() => componentRef.current}
        />
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px" // Smaller row height
        gap="16px" // Smaller gap
      >
        {/* Dashboard Cards */}
        {[
          { title: "Users", icon: <PeopleOutlinedIcon />, count: totalCountUser, link: "/ListUser" },
          { title: "Clients", icon: <PeopleOutlinedIcon />, count: totalCountClient, link: "/ListClient" },
          { title: "Banques", icon: <AccountBalanceOutlinedIcon />, count: totalCountBanque, link: "/ListBanque" },
          { title: "Réunions", icon: <Groups2OutlinedIcon />, count: totalCountReunion, link: "/ListReunion" },
          { title: "Tâches", icon: <AssignmentOutlinedIcon />, count: totalCountTache, link: "/ListTache" },
          { title: "Visites", icon: <TourOutlinedIcon />, count: totalCountVisite, link: "/ListVisite" },
          { title: "Secteurs", icon: <BusinessOutlinedIcon />, count: totalCountSecteur, link: "/ListSecteur" },
          { title: "Régions", icon: <SouthAmericaOutlinedIcon />, count: totalCountRegion, link: "/ListRegion" },
        ].map(({ title, icon, count, link }, index) => (
          <Box
            key={index}
            gridColumn="span 3"
            bgcolor={colors.primary[400]}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px" // Smaller border radius
            padding="16px" // Smaller padding
            position="relative"
          >
            <Box display="flex" alignItems="center" flexDirection="column" mb="8px">
              {React.cloneElement(icon, {
                sx: {
                  color: "#4db6ac",
                  fontSize: "48px", // Smaller icon size
                  mb: "-70px", // Adjusted margin
                },
              })}
              <Typography
                variant="h6"
                sx={{
                  color: colors.primary[100],
                  fontSize: "20px", // Smaller text size
                  textAlign: "center",
                }}
              >
                {title}
              </Typography>
            </Box>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.mode === "dark" ? "white" : "black",
                fontSize: "24px", // Smaller text size
                textAlign: "center",
              }}
            >
              {count}
            </Typography>
            <Link
              to={link}
              style={{
                position: "absolute",
                bottom: "8px", // Adjusted position
                right: "8px", // Adjusted position
                textDecoration: "none",
              }}
            >
              <VisibilityOutlinedIcon
                sx={{
                  color: "#4db6ac",
                  fontSize: "24px", // Smaller icon size
                }}
              />
            </Link>
          </Box>
        ))}

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="20px" // Smaller margin top
            p="0 20px" // Smaller padding
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h6"
              fontWeight="600"
              color={colors.grey[100]}
              fontSize="18px" // Smaller text size
            >
              Revenue Generated
            </Typography>
          </Box>
          <Box height="300px" m="-10px 0 0 0"> {/* Smaller height */}
            <BarChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
