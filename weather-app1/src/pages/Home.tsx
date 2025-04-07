import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Card, CardContent, Typography, CircularProgress, Box } from "@mui/material";
import { motion } from "framer-motion";
const Home: React.FC = () => {
  const { data, status, error } = useSelector((state: RootState) => state.weather);
  if (status === "loading")
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  if (status === "failed")
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 5 }}>
        ❌ Failed to fetch weather data: {error}
      </Typography>
    );
  if (!data)
    return (
      <Typography variant="h6" align="center" sx={{ mt: 5 }}>
        📡 No weather data available. Please search for a city.
      </Typography>
    );
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        sx={{
          maxWidth: 400,
          margin: "auto",
          mt: 5,
          p: 2,
          boxShadow: 3,
          textAlign: "center",
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            🌍 {data.name}
          </Typography>
          <Typography variant="body1">🌡️ Temperature: {data.main.temp}°C</Typography>
          <Typography variant="body1">💧 Humidity: {data.main.humidity}%</Typography>
          <Typography variant="body1">🌬️ Wind Speed: {data.wind.speed} m/s</Typography>
          <Typography variant="body1">
            ☁️ Condition: {data.weather[0].description}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};
export default Home;