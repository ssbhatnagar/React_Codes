import React, { useState } from "react";
import useWeather from "../../hooks/useWeather";
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const { weatherData, loading, error } = useWeather(searchCity);

  function handleSubmit() {
    setSearchCity(city);
  }

  return (
    <div>
      <h2>Weather App 🌦️</h2>
      <div>
        <label>
          Enter your City:
          <input
            type="text"
            placeholder="Enter your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <div>
            <h3>
              {weatherData.location.name}, {weatherData.location.country}
            </h3>
            <p>🌡️ Temperature: {weatherData.current.temperature} °C</p>
            <p>🌤️ Condition: {weatherData.current.weather_descriptions[0]}</p>
            <p>💨 Wind: {weatherData.current.wind_speed} km/h</p>
            <p>💧 Humidity: {weatherData.current.humidity}%</p>
            <img
              src={weatherData.current.weather_icons[0]}
              alt="weather-icon"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
