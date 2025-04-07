
// Isto era suposto ser um mapa one se clicavar em algum lugar do mapa e aparecia o tempo no entanto acabei por perceber que para isso tinha de se subscrever ao mapa e nao ao popup á api



import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const API_KEY = "9832033bf85852728b32863ef646933";

// Popup component to display weather data
const WeatherPopup = ({ forecast, position }) => {
  if (!forecast) return null;

  return (
    <Popup position={position}>
      <div className="text-sm max-h-60 overflow-y-auto w-64">
        <strong>8-Day Forecast</strong>
        {forecast.map((day, index) => {
          const date = new Date(day.dt * 1000).toDateString();
          return (
            <div key={index} className="mt-2">
              <div className="font-semibold">{date}</div>
              <div>🌤 {day.weather[0].description}</div>
              <div>🌡 Temp: {day.temp.day.toFixed(1)}°C</div>
              <div>💧 Humidity: {day.humidity}%</div>
              <div>🌬 Wind: {day.wind_speed} m/s</div>
            </div>
          );
        })}
      </div>
    </Popup>
  );
};

// Event handler to handle location clicks
const LocationClickHandler = ({ setForecastData, setClickPosition }) => {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setClickPosition([lat, lng]);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=minutely,hourly,current,alerts&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        setForecastData(data.daily.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch weather:", error);
        setForecastData(null);
      }
    },
  });

  return null;
};

// Main WeatherMap component
const WeatherMap = ({ toggleMapView }) => {
  const [forecastData, setForecastData] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);

  return (
    <div>
      <button onClick={toggleMapView} className="back-to-home-button">Back to Home</button>

      <MapContainer center={[20, 0]} zoom={2} className="h-screen w-full">
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationClickHandler
          setForecastData={setForecastData}
          setClickPosition={setClickPosition}
        />
        {clickPosition && (
          <Marker
            position={clickPosition}
            icon={L.icon({
              iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <WeatherPopup forecast={forecastData} position={clickPosition} />
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default WeatherMap;
