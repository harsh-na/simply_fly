import React from "react";
import { Box, Typography, Grid, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* Company Info */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            SimplyFly
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            Your trusted partner for hassle-free flight booking. We make travel simple and stress-free.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box>
            <Link href="/about" underline="hover" color="inherit" sx={{ display: "block", marginBottom: "8px" }}>
              About Us
            </Link>
            <Link href="/faq" underline="hover" color="inherit" sx={{ display: "block", marginBottom: "8px" }}>
              FAQ
            </Link>
            <Link href="/contact" underline="hover" color="inherit" sx={{ display: "block", marginBottom: "8px" }}>
              Contact Us
            </Link>
            <Link href="/terms" underline="hover" color="inherit" sx={{ display: "block" }}>
              Terms & Conditions
            </Link>
          </Box>
        </Grid>

        {/* Contact Details */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            Email: support@simplyfly.com
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            Phone: +1 123-456-7890
          </Typography>
          <Typography variant="body2" sx={{ color: "#ccc" }}>
            Address: 123 Aviation Road, Sky City, SC 12345
          </Typography>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <Box>
            <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: "#fff" }}>
              <Facebook />
            </IconButton>
            <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: "#fff" }}>
              <Twitter />
            </IconButton>
            <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: "#fff" }}>
              <Instagram />
            </IconButton>
            <IconButton href="https://www.linkedin.com" target="_blank" sx={{ color: "#fff" }}>
              <LinkedIn />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ marginTop: "40px", borderTop: "1px solid #444", paddingTop: "20px" }}>
        <Typography variant="body2" sx={{ color: "#aaa" }}>
          © {new Date().getFullYear()} SimplyFly. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
