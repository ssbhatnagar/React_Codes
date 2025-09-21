import { useState, useEffect } from "react";

function useWeather(city) {
    const API_KEY = "7a8f8327561faf98cf019afb2c47a044"; 
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        if(!city) return;

        const fetchWeather = async () =>{
            
           
            setLoading(true);
            setError(null);

            try{
                const response = await fetch(`https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`) 

                if(!response.ok){
                    throw new Error("Failed to fetch weather data");
                }
                const data = await response.json();

                if(data.success === false){
                    throw new Error(data.error.info || "City not found");
                }

                setWeatherData(data);
                
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        };

        fetchWeather();

    }, [city]);
    return { weatherData, loading, error };
}
export default useWeather;