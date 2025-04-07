import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WeatherMap = () => {
  const [weatherData, setWeatherData] = useState([]);
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

  const cities = [
    { name: "New York", lat: 40.7128, lon: -74.006 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 }
  ];

  useEffect(() => {
    const fetchWeatherData = async () => {
      const fetchedData = await Promise.all(
        cities.map(async (city) => {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&appid=${apiKey}`
          );
          const data = await response.json();
          return {
            name: city.name,
            lat: city.lat,
            lon: city.lon,
            temp: data.main.temp,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
          };
        })
      );
      setWeatherData(fetchedData);
    };
    fetchWeatherData();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Weather Map</h1>
      <MapContainer center={[20, 0]} zoom={2} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {weatherData.map((city, index) => (
          <Marker key={index} position={[city.lat, city.lon]}>
            <Popup>
              <h3>{city.name}</h3>
              <p>Temperature: {city.temp}°C</p>
              <img src={city.icon} alt="Weather Icon" width="50" height="50" />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
