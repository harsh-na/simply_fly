import React from "react";
import { Box, Typography, Grid2, Card, CardContent, Avatar } from "@mui/material";

const Team = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "Chief Executive Officer",
      description: "Alice is the visionary behind our company, driving innovation and growth.",
      avatar: "./assets/team1.jpg",
    },
    {
      name: "Bob Smith",
      role: "Lead Developer",
      description: "Bob is an expert in software development, ensuring our platform runs smoothly.",
      avatar: "./assets/team2.jpg",
    },
    {
      name: "Clara Lee",
      role: "Marketing Head",
      description: "Clara leads our marketing efforts, connecting us with customers worldwide.",
      avatar: "./assets/team3.jpg",
    },
    {
      name: "David Brown",
      role: "Customer Support Manager",
      description: "David ensures our customers get the best support experience 24/7.",
      avatar: "./assets/team4.jpg",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Team Section Header */}
      <Typography variant="h4" component="h2" gutterBottom>
        Meet Our Team
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "30px", color: "#555" }}>
        Our team of dedicated professionals is committed to delivering the best experience for you.
      </Typography>

      {/* Team Members Grid */}
      <Grid2 container spacing={4} justifyContent="center">
        {teamMembers.map((member, index) => (
          <Grid2 size={{ xs:12, sm:6, md:4, lg:3}} key={index}>
            <Card sx={{ boxShadow: 3, textAlign: "center" }}>
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {member.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "text.secondary", marginBottom: 1 }}
                >
                  {member.role}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {member.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Team;