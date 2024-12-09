import React from "react";
import { Box, Typography, Grid, Grid2, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        textAlign: "center",
        p:2
      }}
    >
      {/* About Us Section */}
      <Typography variant="h4" component="h2" gutterBottom>
        Welcome to SimplyFly
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, color: "#555" }} textAlign= "justify">
        Your trusted partner for hassle-free flight ticket booking. We are
        dedicated to simplifying air travel for everyone, whether you’re
        planning a business trip, a family vacation, or a last-minute getaway.
        With our advanced search algorithms and a user-centric interface, we
        make booking your flight effortless, ensuring that you spend less time
        on logistics and more time on your journey.
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, color: "#555" }} textAlign= "justify">
        Our platform offers a seamless and user-friendly experience, allowing
        you to search, compare, and book flights to destinations worldwide. With
        a focus on convenience and efficiency, we’ve designed our system to
        provide real-time updates, competitive pricing, and secure
        transactions.
        Whether you’re traveling for business or pleasure, we ensure you have
        access to the best options available.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "#555" }} textAlign= "justify">
        At SimplyFly, we understand that every journey is unique.
        That’s why we’re committed to offering personalized solutions and
        exceptional customer service to ensure your travel plans go smoothly.
        From the moment you
        search for your flight until you reach your destination, we’re with you every
        step of the way, providing the support and assistance you need.
        Let us help you take off stress-free and focus on the excitement of
        your next adventure.
      </Typography>

      {/* Feature Cards Section */}
      <Grid2 container spacing={4} justifyContent="center">
        <Grid2 size={{xs:12, sm:6, md:3}}>
          <Card elevation={20}>
            <CardContent>
              <Typography variant="h6" component="h3">
                Fast and Easy Booking
              </Typography>
              <Typography variant="body2" color="textSecondary">
              Our streamlined process ensures you save time and focus on your
              journey, with fewer steps required to secure your ticket.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 item size={{xs:12, sm:6, md:3}}>
          <Card elevation={20}>
            <CardContent>
              <Typography variant="h6" component="h3">
                Transparent Pricing
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We offer honest deals with no hidden fees, so you can plan
                confidently, knowing exactly what you’re paying for.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
        <Grid2 size={{xs:12, sm:6, md:3}}>
          <Card elevation={20}>
            <CardContent>
              <Typography variant="h6" component="h3">
                Reliable Support
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Our dedicated customer service is here to assist you 24/7,
                ensuring that any concerns are addressed promptly.
              </Typography>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default About;