# WeatherApp — Algorithm and Line-by-Line Explanation

This document explains the implementation of `WeatherApp.jsx` and provides a high-level algorithm you can follow to implement the same behavior.

## Contract

- Inputs: a city name typed by the user.
- Outputs: weather information for the searched city (location, temperature, condition, wind, humidity, icon) or error/loader states.
- Error modes: network/API failures or empty results.
- Success criteria: when user submits a non-empty city, the hook fetches data and UI displays it.

## High-level Algorithm

1. Initialize two state variables: `city` (text input) and `searchCity` (the city to query).
2. Use a custom hook `useWeather(searchCity)` that returns `weatherData`, `loading`, and `error`.
3. Show a text input bound to `city` and a button that, when clicked, sets `searchCity = city` (triggering the hook to re-run the fetch).
4. Render loading text when `loading` is true.
5. Render an error message when `error` contains a value.
6. When `weatherData` exists, render the returned data fields: location name & country, temperature, condition, wind, humidity, and icon.

## Line-by-line explanation

Below is the code from `src/questions/WeatherApp.jsx` with an explanation of each line or small group of lines.

1. import React, { useState } from "react";
   - Imports React and the `useState` hook from the React package. `useState` is used to create local component state.

2. import useWeather from "../hooks/useWeather";
   - Imports a custom hook `useWeather` located in `src/hooks/useWeather.js`. This hook encapsulates fetching weather data for a given city.

3. const WeatherApp = () => {
   - Declares the `WeatherApp` functional component.

4.   const [city, setCity] = useState("");
   - Creates a state variable `city` (the controlled input value) and `setCity` to update it. Initially an empty string.

5.   const [searchCity, setSearchCity] = useState("");
   - Creates a second state variable `searchCity` which holds the city name to be passed to the `useWeather` hook. Separating input state from search state avoids fetching on every keystroke.

6.   const { weatherData, loading, error } = useWeather(searchCity);
   - Calls the `useWeather` hook with `searchCity`. The hook returns an object with `weatherData` (fetched response), `loading` (boolean), and `error` (string or null).

7.   function handleSubmit() {
8.     setSearchCity(city);
9.   }
   - Defines `handleSubmit`, a function that copies the current `city` input into `searchCity`. This triggers `useWeather` to refetch for the new city.

10.   return (
11.     <div>
12.       <h2>Weather App 🌦️</h2>
   - Returns the component JSX. Renders a title.

13.       <div>
14.         <label>
15.           Enter your City:
16.           <input
17.             type="text"
18.             placeholder="Enter your City"
19.             value={city}
20.             onChange={(e) => setCity(e.target.value)}
21.           />
22.         </label>
23.         <button onClick={handleSubmit}>Submit</button>
24.       </div>
   - Renders a label with a controlled text `input` bound to `city`. `onChange` updates `city` on each keystroke. A `Submit` button invokes `handleSubmit` when clicked.

25.       <div style={{ marginTop: "20px" }}>
26.         {loading && <p>Loading...</p>}
27.         {error && <p style={{ color: "red" }}>{error}</p>}
   - Renders a container that conditionally shows a loading indicator if `loading` is true, and shows an error message if `error` is truthy.

28.         {weatherData && (
29.           <div>
30.             <h3>
31.               {weatherData.location.name}, {weatherData.location.country}
32.             </h3>
33.             <p>🌡️ Temperature: {weatherData.current.temperature} °C</p>
34.             <p>🌤️ Condition: {weatherData.current.weather_descriptions[0]}</p>
35.             <p>💨 Wind: {weatherData.current.wind_speed} km/h</p>
36.             <p>💧 Humidity: {weatherData.current.humidity}%</p>
37.             <img
38.               src={weatherData.current.weather_icons[0]}
39.               alt="weather-icon"
40.             />
41.           </div>
42.         )}
   - If `weatherData` exists, renders details from the API response. The code assumes a particular API shape: `weatherData.location` and `weatherData.current` with certain fields and arrays for icons/descriptions.

43.       </div>
44.     </div>
45.   );
46. };

47. export default WeatherApp;
   - Exports the component as default so it can be imported elsewhere in the app.

## Example algorithm in pseudocode

This is a step-by-step algorithm you can follow to build a similar component or to re-implement `useWeather` if needed.

1. Start component.
2. Initialize inputState = "".
3. Initialize queryState = "".
4. When user types, update inputState.
5. When user submits, set queryState = inputState.
6. In an effect hook (inside `useWeather`) watch queryState. If non-empty:
   - set loading = true, error = null
   - fetch weather data from API endpoint (e.g., weatherstack or OpenWeatherMap) using encoded queryState
   - if fetch fails, set error to message and loading = false
   - if fetch succeeds, set weatherData to parsed JSON and loading = false
7. Render UI:
   - show loading indicator when loading
   - show error message if error
   - show weatherData when available

## Edge cases & notes

- Empty Search: The UI uses `searchCity` so empty input won't refetch unless submitted.
- Debounce: If you prefer auto-search on typing, add a debounce to reduce API calls.
- Validation: Trim and validate `city` before setting `searchCity`.
- API key: `useWeather` likely uses an API key stored in env; ensure `.env` is configured.
- Network errors and unexpected responses: validate response shape before rendering fields.

## Suggested small improvements (optional)

- Disable the Submit button while `loading` is true to prevent duplicate searches.
- Show a friendly message when `weatherData` is empty after a search (e.g., "No data found for <city>").
- Add form submit handling so Enter key also triggers submit.

---

Requirements coverage:
- Write an algo file for `WeatherApp` — Done: `src/notes/WeatherAppAlgo.md` created.
- Explain each code line by line — Done: provided line-by-line explanations.
- Add an algorithm — Done: included pseudocode and high-level algorithm.

Completion: marking todo as completed now.
