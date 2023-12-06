import WeatherCard from "./WeatherCard";
import axios from "axios";
import { useEffect, useState } from "react";
import DailyWidget from "./DailyWidget";

function App() {
  const [search, setSearch] = useState();
  const [city, setCity] = useState("Gandhinagar");
  const [weather, setWeather] = useState({
    current: null,
    location: null,
    error: null,
    forecastday:null
  });

  const submit = () => {
    setCity(search);
    setSearch("");
  };
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") submit();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [search]);

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await axios.get(
          `http://api.weatherapi.com/v1/forecast.json?key=75f4f20ab3b2409589b192510232711&q=${city}&days=6&aqi=no&alerts=yes`
        );
        setWeather({
          ...weather,
          error: null,
          current: res.data.current, 
          location: res.data.location, //name property has city and country holds country name
          forecastday:res.data.forecast.forecastday //array of objects with days of forecast and contains hour array for hourly forecast
        });
        console.log(weather)
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeather({ ...weather, error: error });
      }
    };

    callAPI();
  }, [city]);

  if(weather.forecastday==null) return <p>loading</p>

  return (
    <>
      <div className="min-h-screen min-w-full flex items-center justify-center gap-36 bg-slate-900">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="relative mt-2 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0  flex items-center pl-3">
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <input
              key="searchbar"
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            ></input>
          </div>

          <WeatherCard weather={weather} />
        </div>
        {weather.error===null? 
        ( <div className="flex flex-col items-center h-96 w-[40vw] mt-20 gap-4">
          
          <DailyWidget forecastday={weather.forecastday[1]} style="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300"/>
          <DailyWidget forecastday={weather.forecastday[2]}  style="bg-gradient-to-r from-indigo-300 from-10% via-sky-300 via-30% to-emerald-300 to-90%"/>
          <DailyWidget forecastday={weather.forecastday[3]}  style="bg-gradient-to-r from-yellow-300 via-pink-300 to-orange-100"/>
          <DailyWidget forecastday={weather.forecastday[4]}  style="bg-gradient-to-r from-green-300 via-lime-300 to-blue-300"/>
          <DailyWidget forecastday={weather.forecastday[5]} style="bg-gradient-to-r from-slate-300 via-indigo-400 to-sky-300"/>

        </div>)
        :
          null
        }
      </div>
    </>
  );
}

export default App;
