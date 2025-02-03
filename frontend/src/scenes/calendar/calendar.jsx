import { useState, useEffect } from "react";
import { formatDate } from '@fullcalendar/core';
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
  Button,
  IconButton,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { Link } from 'react-router-dom';

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reunions, setReunions] = useState([]);

  useEffect(() => {
    const fetchReunions = async () => {
      try {
        const response = await axios.get("http://localhost:3002/reunions/get");
        setReunions(response.data.reunions.map(reunion => ({
          id: reunion.id,
          title: reunion.libelle,
          start: reunion.date_debut,
          end: reunion.date_fin,
        })));
      } catch (error) {
        console.error("Error fetching reunions:", error);
      }
    };

    fetchReunions();
  }, []);

  const handleDateClick = (selected) => {
    // Handle date click event
  };

  const handleEventClick = (selected) => {
    // Handle event click event
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      <Box style={{ textAlign: "center", marginBottom: "20px" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box display="flex" alignItems="center" mr={2}>
            <Button
              component={Link}
              to="/calendarVisite"
              style={{ backgroundColor: "#f521a4" }}
              variant="contained"
              color="primary"
            >
              Visites
            </Button>
            <IconButton component={Link} to="/visite" sx={{ color: '#f521a4', fontSize: '48px', marginLeft: '5px' }}>
              <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" mr={2}>
            <Button
              component={Link}
              to="/calendar"
              style={{ backgroundColor: "red" }}
              variant="contained"
              color="primary"
            >
              Réunions
            </Button>
            <IconButton component={Link} to="/reunion" sx={{ color: 'red', fontSize: '48px', marginLeft: '5px' }}>
              <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>

          <Box display="flex" alignItems="center" mr={2}>
            <Button
              component={Link}
              to="/calendarTache"
              style={{ backgroundColor: "#8b8b56" }}
              variant="contained"
              color="primary"
            >
              Tâches
            </Button>
            <IconButton component={Link} to="/tache" sx={{ color: '#8b8b56', fontSize: '48px', marginLeft: '5px' }}>
              <AddBoxOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Réunions</Typography>
          <List>
            {reunions.map((reunion) => (
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
              const events = reunions.map(reunion => ({
                id: reunion.id,
                title: `${reunion.title} - ${formatDate(reunion.start, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}`,
                start: reunion.start,
                end: reunion.end,
              }));
              successCallback(events);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
