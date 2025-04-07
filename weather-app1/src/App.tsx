import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchWeather } from "./redux/weatherSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, Container } from "@mui/material";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App: React.FC = () => {
  const dispatch = useDispatch();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          fetchWeather({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }) as any
        );
      },
      (error) => {
        console.error("Error fetching location:", error);
      }
    );
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles theme={theme} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <Router>
        <Navbar toggleTheme={() => setDarkMode(!darkMode)} darkMode={darkMode} />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};
export default App;