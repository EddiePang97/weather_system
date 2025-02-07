import React, { useState } from "react";
import SearchBar from "../../components/SearchBar";
import { fetchWeatherData, WeatherData } from "../../services/weatherService";
import WeatherCard from "../../components/WeahterCard";
import './index.css';
import { message } from "antd";



const mockWeatherData: WeatherData = {
    temp: 26,
    tempMax: 29,
    tempMin: 26,
    humidity: 58,
    weatherMain: 'Clouds',
    name: "Johor",
    country: 'MY',
    date: 1738928703,
    clouds: 0
};
const WeatherPage: React.FC = () => {

    const [currentWeather, setCurrentWeather] = useState<WeatherData>(mockWeatherData);
    const [searchHistory, setSearchHistory] = useState<WeatherData[]>([]);
    const [messageApi, contextHolder] = message.useMessage();


    // const error = () => {
    //     messageApi.open({
    //       type: 'error',
    //       content: 'This is an error message',
    //     });
    //   };

    const handleFetchWeather = async (e: string) => {
        const respone = await fetchWeatherData(e);

        console.log(respone);
        if (respone) {
            setCurrentWeather(respone)
            setSearchHistory((prevHistory) => {
                // Check if location already exists in the history
                const existingIndex = prevHistory.findIndex(item => item.name === respone.name);

                if (existingIndex !== -1) {
                    // Replace the existing entry with new data
                    const updatedHistory = [...prevHistory];
                    updatedHistory[existingIndex] = respone;
                    return updatedHistory;
                } else {
                    // Add new entry to the search history
                    return [...prevHistory, respone];
                }
            });
        }else{
            messageApi.open({
                type: 'error',
                content: 'Please Insert Correct Country',
              });
            
        }
    };

    const handeleCbDelete = (city: string) => {
        setSearchHistory((prevHistory) => {
            // Filter out the city to be deleted
            return prevHistory.filter((item) => item.name !== city);
        });
        console.log(`${city} removed from search history.`);
    };

    const handleCbOnsearch = async (city: string) => {
        // Find the city in the search history
        const existingEntry = searchHistory.find((item) => item.name === city);

        if (existingEntry) {
            console.log(`Searching for ${city} using cached data.`);
            setCurrentWeather(existingEntry);
        } else {
            console.log(`Fetching weather data for ${city} from API.`);
            // Optionally, fetch the weather again if not found in search history
            const response = await fetchWeatherData(city);
            if (response) {
                setCurrentWeather(response);
                setSearchHistory((prevHistory) => [...prevHistory, response]);
            }
        }
    };


    return (
        <div className="weather-container">
 {contextHolder}
            <SearchBar onSearch={handleFetchWeather} />

            <WeatherCard weatherData={currentWeather} searchHistory={searchHistory} cbDelete={handeleCbDelete} cbOnSearch={handleCbOnsearch} />



        </div>


    );
};

export default WeatherPage;
