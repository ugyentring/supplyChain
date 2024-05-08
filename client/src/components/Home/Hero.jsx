import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Navbar from "./Navbar";
import heroImg from "../../img/hero_illustration.png";
import CustomButton from "./CustomButton";
import { Link } from "react-router-dom";

const Hero = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "#F2E6D0", minHeight: "100vh" }}>
      <Container>
        <Navbar />
        <CustomBox>
          <Box sx={{ flex: "2" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#404040",
                fontWeight: "500",
                mt: 1,
                mb: 4,
              }}
            >
              Welcome to BlockSafe Identify
            </Typography>
            <Title variant="h1" sx={{ color: "#404040" }}>
              Secure Authentic Products with BlockSafe Identify
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#404040", my: 4 }}
            >
              A blockchain-based fake product verification system that addresses
              privacy and scalability issues while utilizing the security and
              transparency of blockchain technology to fight fraudulent identity
              and identity theft.
            </Typography>
            <Link to="/scanner" style={{ textDecoration: "none" }}>
              <CustomButton
                backgroundColor="#F1B749"
                color="#fff"
                buttonText="Scan QR"
                heroBtn={true}
              />
            </Link>
          </Box>

          <Box sx={{ flex: "1.25" }}>
            <img
              src={heroImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default Hero;
