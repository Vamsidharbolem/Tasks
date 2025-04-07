import React, { useState } from "react";
import { TextField, Button, Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchWeather } from "../redux/weatherSlice";
import { AppDispatch } from "../redux/store";

const API_KEY = "41c3c373d04e93a653d2ebb4f7b46c70";

const Search: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState<any>(null);
  const [weatherDetails, setWeatherDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fetchWeatherData = async (query: string) => {
    try {
      setLoading(true);
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?${query}&units=metric&cnt=7&appid=${API_KEY}`
      );
      if (!forecastResponse.ok) {
        const errorData = await forecastResponse.json();
        throw new Error(errorData.message || "City not found!");
      }
      const forecastData = await forecastResponse.json();
      setForecast(forecastData);
      setError(null);
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${query}&units=metric&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      setWeatherDetails(weatherData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    if (!city.trim()) {
      setError("Please enter a valid city name.");
      return;
    }
    fetchWeatherData(`q=${city}`);
    dispatch(fetchWeather({ city }) as any);
  };
  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherData(`lat=${latitude}&lon=${longitude}`);
      },
      (error) => {
        setError("Unable to retrieve location. Please allow location access.");
        setLoading(false);
      }
    );
  };
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString();
  };
  return (
    <Container sx={{ mt: 5 }}>
      <TextField
        label="Enter City"
        variant="outlined"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ mr: 2 }}>
        Search
      </Button>
      <Button variant="outlined" onClick={handleCurrentLocation} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Use Current Location"}
      </Button>
      {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
      {/* 🌤️ Current Weather Details */}
      {weatherDetails && (
        <Card sx={{ mt: 4, p: 2 }}>
          <CardContent>
            <Typography variant="h5">{weatherDetails.name} - Current Weather</Typography>
            <Typography>🌡️ Temperature: {weatherDetails.main.temp}°C</Typography>
            <Typography>💧 Humidity: {weatherDetails.main.humidity}%</Typography>
            <Typography>🌬️ Wind Speed: {weatherDetails.wind.speed} m/s</Typography>
            {weatherDetails.uvi && <Typography>☀️ UV Index: {weatherDetails.uvi}</Typography>}
            <Typography>🌅 Sunrise: {formatTime(weatherDetails.sys.sunrise)}</Typography>
            <Typography>🌇 Sunset: {formatTime(weatherDetails.sys.sunset)}</Typography>
            <Typography>🌤️ Conditions: {weatherDetails.weather[0].description}</Typography>
          </CardContent>
        </Card>
      )}
      {/* 📅 7-Day Forecast */}
      {forecast && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5">{forecast.city.name} - 7 Day Forecast</Typography>
          {forecast.list.map((day: any, index: number) => (
            <Card key={index} sx={{ my: 2, p: 2 }}>
              <CardContent>
                <Typography variant="h6">Day {index + 1}</Typography>
                <Typography>🌡️ Temp: {day.main.temp}°C</Typography>
                <Typography>💧 Humidity: {day.main.humidity}%</Typography>
                <Typography>🌬️ Wind Speed: {day.wind.speed} m/s</Typography>
                <Typography>🌤️ Conditions: {day.weather[0].description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
      )}
    </Container>
  );
};
export default Search;