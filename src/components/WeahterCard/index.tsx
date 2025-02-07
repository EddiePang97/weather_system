import React from 'react';
import { Card, Flex, Grid, Typography } from 'antd';
import cloudImage from "../../assets/cloud.png";
import sunImage from "../../assets/sun.png";
import './index.css';
import moment from 'moment';
import SearchHistory from '../SearchHistoryList';
import { WeatherData } from '../../services/weatherService';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface WeatherCardProps {
    weatherData: WeatherData;
    searchHistory: WeatherData[];
    cbDelete:(city:string)=>void
cbOnSearch:(city:string)=>void
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, searchHistory,cbDelete,cbOnSearch }) => {


    const screens = useBreakpoint();
    const phoneSize = !(screens.xl || screens.xxl)
    const fontSize = phoneSize ? 12 : 18;
    console.log(screens.xs, screens.sm);
    const dateFormat = phoneSize ? "DD-MM-YYYY" : "DD-MM-YYYY hh:mm a"
    const formattedDate = moment(weatherData.date).format(dateFormat);
    return (
        <div className="weather-card-container">
            <div className='card-box'>
                <div style={{ position: 'relative' }}>
                    <img alt="cloud" className="weather-icon" src={weatherData.weatherMain !== "Clouds" ? sunImage : cloudImage} />
                    <Card
                        bordered={false}
                        style={{
                            background: 'rgba(255, 255, 255, 0.3)',
                            backdropFilter: 'blur(10px)',
                            border: "1px solid #FFFFFF33",
                            borderRadius: '20px',
                            padding: '88px 20px',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                        }}
                    >
                        <Flex style={{ width: "100%", paddingBottom: "50px" }}>
                            <Flex className="responsive-flex" vertical style={{ width: phoneSize ? "100%" : "50%" }}>
                                <Text style={{ fontSize }}>Today's Weather</Text>
                                <Title
                                    level={1}
                                    style={{
                                        color: '#6C40B5',
                                        fontSize: `clamp(${phoneSize ? 45 : 82}px, 5vw, 126px)`,
                                        lineHeight: '1',
                                        margin: '0',
                                    }}
                                >
                                    {weatherData.temp}°
                                </Title>
                                <div className="temperature-details">
                                    <Text style={{ fontSize }}>H: {weatherData.tempMax}° L: {weatherData.tempMin}°</Text>
                                    <br />
                                    <Text style={{ fontSize }}>{weatherData.name}, {weatherData.country}</Text>
                                </div>
                            </Flex>

                            <Flex
                                vertical={phoneSize} 
                                className="responsive-row-to-column"
                                align="flex-end"
                                justify={phoneSize ? "flex-end" : "space-between"}
                                style={{ width: "100%" }}
                            >
                                <div style={{ fontSize, color: "#666666" }}>{weatherData.weatherMain}</div>
                                <div style={{ fontSize, color: "#666666" }}>Humidity: {weatherData.humidity}%</div>
                                <div style={{ fontSize, color: "#666666" }}>{formattedDate}</div>

                            </Flex>
                        </Flex>
                        <SearchHistory historylist={searchHistory} cbOnSearch={cbOnSearch} cbDelete={cbDelete} />

                    </Card>
                </div>


            </div>

        </div>
    );
};

export default WeatherCard;
