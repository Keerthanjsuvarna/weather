import React, { useState } from 'react'
import './App.css'
import './index.css'

const WeatherApp = () => {
  var [location, setLocation] = useState('');
  var [jk, setjk] = useState('');
  var loc = location;
  console.log(loc);
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };
    const fetchWeatherData = async () => {
      const API_KEY = '78163c3ce5276058a866f592cc163bc4'; 
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
    
        if (response.ok) {
          const { main, weather } = data;
          const temperature = main.temp;
          const description = weather[0].description;
          setjk (location);
          setLocation('');
    
          setWeatherData({ temperature, description });
        } else {
          console.error('Error:', data.message);
          alert("location doesnt exist")
          setLocation('');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div className="weather-app-container">
    <h1>Weather App</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleLocationChange}
        
      />
      <button type="submit">Search</button>
    </form>
    {weatherData && (
      <div className="weather-data-container">
        <h2>Weather for {jk}</h2>
        <p>Temperature: {weatherData.temperature}</p>
        <p>Description: {weatherData.description}</p>
      </div>
    )}
  </div>
);
};

export default WeatherApp;