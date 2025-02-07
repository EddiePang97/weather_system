import { message } from "antd";

const API_KEY = '7e7c4a33435c745234768d1c972f8c7b'; // Replace with your actual API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherData = async (city: string) => {
    
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    // Extract only the relevant fields
    return {
      name: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      tempMax: data.main.temp_max,
      tempMin: data.main.temp_min,
      humidity: data.main.humidity,
      weatherMain: data.weather[0].main,
      clouds: data.clouds.all,
      date: data.dt,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);

    // Type guard to access error message safely
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

    // Display error message using message component
    message.error(errorMessage, 3); // 3-second duration for the message

    return null;
  }
};

export interface WeatherData {
  name: string;
  country: string;
  temp: number;
  tempMax: number;
  tempMin: number;
  humidity: number;
  weatherMain: string;
  clouds: number;
  date: number;
}
