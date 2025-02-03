import { useState, useEffect } from "react";
import { formatDate } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import axios from 'axios';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  IconButton,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';
 
const CalendarVisite  = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [visites, setVisites] = useState([]);

  useEffect(() => {
    const fetchReunions = async () => {
      try {
        const response = await axios.get("http://localhost:3002/visites/get");
        setVisites(response.data.visites.map(visite => ({
          id: visite.id,
          title: visite.libelle,
          start: visite.date_debut,
          end: visite.date_fin,
          // Ajoutez d'autres champs nécessaires ici
        })));
      } catch (error) {
        console.error("Error fetching visite:", error);
      }
    };

    fetchReunions();
  }, []);

  const handleDateClick = (selected) => {
   
  };

  const handleEventClick = (selected) => {
   
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box style={{ textAlign:"center" }}>
     
      <Button  component={Link}  to="/calendarVisite" style={{ backgroundColor: "#f521a4", marginRight: 10 }} variant="contained" color="primary">Visites</Button>
      <IconButton component={Link} to="/visite" sx={{ color: '#f521a4', fontSize: '48px', marginLeft: '5px' }}>
              <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>
        <Button  component={Link} to="/calendar"  style={{backgroundColor:"red",marginRight: 10}} variant="contained" color="primary" >Réunions</Button>
        <IconButton component={Link} to="/reunion" sx={{ color: 'red', fontSize: '48px', marginLeft: '5px' }}>
              <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>
       
        <Button component={Link}  to="/calendarTache"  style={{backgroundColor:"#8b8b56",marginRight: 10}} variant="contained" color="primary">Tâches</Button>
        <IconButton component={Link} to="/tache" sx={{ color: '#8b8b564', fontSize: '48px', marginLeft: '5px' }}>
              <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>
        </Box>
      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Visites</Typography>
          <List>
            {visites.map((reunion) => (
              <ListItem
                key={reunion.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={reunion.title}
                  secondary={
                    <Typography>
                      {formatDate(reunion.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
   <Box flex="1 1 100%" ml="15px">
  <FullCalendar
    height="75vh"
    plugins={[
      dayGridPlugin,
      timeGridPlugin,
      interactionPlugin,
      listPlugin,
    ]}
    headerToolbar={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    }}
    initialView="dayGridMonth"
    editable={true}
    selectable={true}
    selectMirror={true}
    dayMaxEvents={true}
    select={handleDateClick}
    eventClick={handleEventClick}
    events={(fetchInfo, successCallback, failureCallback) => {
      // Convertir les réunions en un tableau d'événements
      const events = visites.map(visite => ({
        id: visite.id,
        title: `${visite.title} - ${formatDate(visite.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`,
        start: visite.start,
      
      }));

      // Passer le tableau d'événements à la fonction de rappel de succès
      successCallback(events);
    }}
  />
</Box>


      </Box>
    </Box>
  );
};

export default CalendarVisite;
