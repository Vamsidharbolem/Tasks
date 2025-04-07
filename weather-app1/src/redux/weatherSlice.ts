import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const API_KEY = "41c3c373d04e93a653d2ebb4f7b46c70";
interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}
interface WeatherState {
  data: WeatherData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}
const initialState: WeatherState = {
  data: null,
  status: "idle",
  error: null,
};
export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    { city, lat, lon }: { city?: string; lat?: number; lon?: number },
    { rejectWithValue }
  ) => {
    try {
      const endpoint = city
        ? `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await axios.get<WeatherData>(endpoint);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unknown error");
    }
  }
);
const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action: PayloadAction<WeatherData>) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export default weatherSlice.reducer;