import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
// import Footer from '../Footer/Footer';
import manageFlightImg from './Images/manageFlights.png';
import manageRoutesImg from './Images/manageRoutesImg.png';
import manageScheduleImg from './Images/manageSchedule.png';
import manageBookingImg from './Images/manageBooking.png';
import backgroundImage from './Images/flightOwnerbackground.png';

export default function Dashboard() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username');

  const services = [
    {
      title: 'Manage Flights',
       img: manageFlightImg,
       route: '/flightOwner/manageFlight',
    },
    {
      title: 'Manage Routes',
       img: manageRoutesImg,
    //   route: '/flightOwner/manageRoute',
    },
    {
      title: 'Manage Schedules',
       img: manageScheduleImg,
    //   route: '/flightOwner/manageSchedule',
    },
    {
      title: 'Manage Bookings',
       img: manageBookingImg,
    //   route: '/flightOwner/manageBooking',
    },
  ];

  return (
    <Box style={{
        height: '100vh',
        background: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}>
        
      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flight Owner Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Welcome Section */}
      <Box sx={{ textAlign: 'center',color:"white", my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hello <span style={{ color: '#FFD700' }}>{username || 'Guest'}</span>!
        </Typography>
        <Typography variant="h5" gutterBottom>
          BE THE <span style={{ color: '#FFD700' }}>BEST PILOT</span> YOU CAN BE
        </Typography>
        <Typography variant="h6">
          - EMPLOYED BY THE <span style={{ color: '#FFD700' }}>FINEST</span>
        </Typography>
      </Box>

      {/* Services Section */}
      <Box sx={{ textAlign: 'center',color:"white", my: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Services
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ maxWidth: 345, cursor: 'pointer' }} onClick={() => navigate(service.route)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={service.img}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {service.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      {/* <Footer /> */}
    </Box>
  );
}
