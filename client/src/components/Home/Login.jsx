import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import bgImg from "../../img/bg.png";
import "../../css/Login.css";

const LOGIN_URL = "/auth";

export default function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(LOGIN_URL, {
        username: user,
        password: pwd,
      });

      if (res?.data.length === 0) {
        setErrMsg("Login Failed. Please try again later.");
      } else {
        const role = res?.data[0].role;
        setAuth({ user, pwd, role });
        setUser("");
        setPwd("");
        navigate(`/${role}`, { replace: true });
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Server is down. Please try again later.");
      } else if (err.response?.status === 400) {
        setErrMsg("Invalid username or password.");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized access.");
      } else {
        setErrMsg("Login Failed. Please try again later.");
      }
      errRef.current?.focus();
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${bgImg})`,
        minHeight: "80vh",
        backgroundRepeat: "no-repeat",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: "cover",
        zIndex: -2,
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 2,
            px: 4,
            py: 6,
            marginTop: 8,
            backgroundColor: "#F2E6D0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            align: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: "center",
              marginBottom: "3%",
              marginTop: "3%",
              fontFamily: "Gambetta",
              fontWeight: "bold",
              fontSize: "2.5rem",
            }}
          >
            BlockSafe Identity
          </Typography>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {errMsg && (
            <Typography
              component="h1"
              variant="body2"
              color="error"
              ref={errRef}
              sx={{ marginTop: "2rem" }}
            >
              {errMsg}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="login-btn"
              sx={{ mt: 3, mb: 2, backgroundColor: "#F1B749" }}
            >
              Login
            </Button>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button sx={{ color: "#F1B749" }} onClick={handleBack}>
                Back
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
