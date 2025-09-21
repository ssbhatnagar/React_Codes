# useWeather Hook — Algorithm and Line-by-Line Explanation

This document explains the `useWeather` custom hook found at `src/hooks/useWeather.js` and provides a high-level algorithm for how it works.

## Contract

- Inputs: `city` (string) — the city name to query the weather for.
- Outputs: an object { weatherData, loading, error }:
  - `weatherData`: the parsed JSON response from the API or `null`.
  - `loading`: boolean, `true` while fetching.
  - `error`: `null` or a string describing the error.
- Error modes: network failures, non-OK HTTP responses, and API-specific errors returned in the JSON.
- Success criteria: when `city` is non-empty, the hook fetches data and updates `weatherData` with the API response.

## High-level Algorithm

1. Define an API key to use with the weather API.
2. Create internal state: `weatherData` (null), `loading` (true), `error` (null).
3. Watch `city` with an effect hook.
4. When `city` is truthy:
   - Set `loading` true and `error` to null.
   - Fetch data from the weather API using the API key and the city query.
   - If the HTTP response is not OK, throw an error.
   - Parse the response JSON.
   - If the API returns a failure payload (e.g., `success: false`), throw an error with the API message.
   - On success, set `weatherData` to the parsed data.
   - On error, set `error` to the error message.
   - Always set `loading` to false when done.
5. Return { weatherData, loading, error } to callers.

## Line-by-line explanation

1. import { useState, useEffect } from "react";
   - Imports `useState` and `useEffect` from React. `useState` manages local state variables; `useEffect` runs side-effects (like fetching) when dependencies change.

2. function useWeather(city) {
   - Declares the `useWeather` hook which accepts a `city` parameter.

3.     const API_KEY = "7a8f8327561faf98cf019afb2c47a044"; 
   - Defines the API key used to authenticate requests to the weather API. In production, store this in environment variables instead of hard-coding.

4.     const [weatherData, setWeatherData] = useState(null);
   - `weatherData` will hold the fetched API response; initially `null`.

5.     const [loading, setLoading] = useState(true);
   - `loading` indicates whether a fetch is in-progress. Initialized to `true` which means components may show a loading UI before the first fetch. You can set it to `false` initially if you prefer no loader until a search occurs.

6.     const [error, setError] = useState(null);
   - `error` holds an error message (string) or `null` when there's no error.

7.     useEffect(()=> {
8.         if(!city) return;
   - `useEffect` runs when `city` changes. If `city` is falsy (empty string, null, undefined), the effect returns early and does nothing. This prevents fetching until a city is provided.

9.         const fetchWeather = async () =>{
   - Declares an asynchronous function `fetchWeather` responsible for performing the HTTP request and updating state.

10.            setLoading(true);
11.            setError(null);
   - Prior to the fetch, set `loading` to `true` and clear any previous error.

12.            try{
13.                const response = await fetch(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`) 
   - Performs the network request to the Weatherstack API using `fetch`. The URL includes the `API_KEY` and the `city` as the `query` parameter.

14.                if(!response.ok){
15.                    throw new Error("Failed to fetch weather data");
16.                }
   - Checks the HTTP response `ok` flag (status 2xx). If the response is not OK, throws an error to be handled by the `catch` block.

17.                const data = await response.json();
   - Parses the JSON body of the response.

18.                if(data.success === false){
19.                    throw new Error(data.error.info || "City not found");
20.                }
   - Checks for an API-specific failure by looking at `data.success`. If the API indicates failure, throws an error using the API-provided message (or a fallback).

21.                setWeatherData(data);
   - On success, updates `weatherData` state with the entire parsed response.

22.            }catch(err){
23.                setError(err.message);
24.            }finally{
25.                setLoading(false);
26.            }
   - The `catch` block sets the `error` state to the caught error's message. The `finally` block ensures `loading` is set to `false` regardless of success or failure.

27.        };

28.        fetchWeather();
   - Calls the `fetchWeather` function immediately to perform the request.

29.    }, [city]);
   - The effect depends on `city` — it re-runs whenever `city` changes.

30.    return { weatherData, loading, error };
   - The hook returns an object containing the weather data, the loading boolean, and the error message.

31. }
32. export default useWeather;
   - Exports the hook as default so it can be imported by components such as `WeatherApp`.

## Edge cases & improvements

- API key security: Move the API key to an environment variable (e.g., `VITE_WEATHERSTACK_KEY` for a Vite app) and load from `import.meta.env` or `process.env`.
- Initial loading state: Consider initializing `loading` to `false` to avoid showing a loader before a user searches.
- Debouncing & cancellation: If you add auto-search on typing, debounce requests and cancel previous fetches (AbortController) to avoid race conditions.
- Validation: Trim and validate `city` before fetching.
- Response shape: Validate existence of nested fields before reading them in the component (to avoid runtime errors).

## Pseudocode

1. on hook call, set local states: weatherData=null, loading=true, error=null
2. when city changes and is non-empty, set loading=true, error=null
3. try fetching the API URL with API_KEY and city
4. if HTTP not-ok or API returns error, set error and stop
5. parse JSON and set weatherData
6. set loading=false

---

I will now mark the todo for the hook notes as completed.
