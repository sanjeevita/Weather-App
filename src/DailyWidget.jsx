import React from "react";

const DailyWidget = ({ forecastday, style }) => {
  const getDay = (date) => {
    console.log('date fn called')
    date = new Date(date);
    let day = date.toLocaleDateString("en", { weekday: "long" });
    console.log(day)
    return day.slice(0,3);
  };

  if (forecastday === null) return <div>loading</div>;


  return (
    <div
      className={`w-full p-2 flex place-content-evenly items-center gap-5 bg-white h-16 rounded-xl ${style}`}
    >
      <div className="font-semibold text-xl bg-black text-white rounded-3xl p-2">
        { getDay(forecastday.date)}
      </div>

      <div>{forecastday.day.avgtemp_c}°C</div>

      <div className="flex flex-row items-center">
        <img className="h-16 w-16" src={forecastday.day.condition.icon} />
        <span className="font-semibold">{forecastday.day.condition.text}</span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <i class="fa-solid fa-droplet fa-xl"></i>
        <span className="font-semibold">
          {forecastday.day.totalprecip_mm}% precipication
        </span>
      </div>

      <div className="flex flex-row items-center gap-2">
        <i className="fa-solid fa-wind fa-xl"></i>
        <span className="font-semibold">
          {forecastday.day.maxwind_kph}k/h wind speed
        </span>
      </div>
    </div>
  );
};

export default DailyWidget;
