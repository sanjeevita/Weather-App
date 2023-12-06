import "./index.css";
import Clock from "./Clock";

const WeatherCard = ({ weather }) => {
  const loading = "loading";
  let date = new Date();
  let currDate = date.toLocaleDateString();
  let day = date.toLocaleString("en", { weekday: "long" }).slice(0, 3);

  if (weather.data === null || weather.location ===null) return <p>loading...</p>;

  return (
    <>
      <div className="h-96 w-72 hover:scale-110 transition ease-in-out delay-150 bg-white rounded-xl p-2 ">
        {weather.error !== null ? (
          <div className="flex flex-col items-center justify-center gap-8">
            <div>No Data Found</div>
            <img src="https://media.istockphoto.com/id/1218831660/vector/404-error-web-page.jpg?s=612x612&w=0&k=20&c=Y1MImi60qWxBYdrU5O5DeTkMd_nl22EX7Qnh0_mw370=" />
          </div>
        ) : (
          <>
            <div className="font-mono font-bold text-4xl mt-3 ml-2">
              {weather.location.name}
            </div>
            <div className="font-mono text-sm ml-2">
              {weather.location.country}
            </div>
            <div className="font-mono text-slate-500 text-xs ml-2">
              {day}, <Clock />, {currDate}
            </div>
            <div className="flex items-center gap-8 mt-5 border-2 border-zinc-600 bg-indigo-900 p-2 rounded-lg">
              <img
                className="h-20 w-20 ml-3"
                src={weather.current.condition.icon}
              />
              <div className="flex flex-col ">
                <div className="font-mono font-medium text-white text-4xl">
                  {weather.current.temp_c}°C
                </div>
                <div className="text-sm font-semibold font mono text-purple-200">
                  {weather.current.condition.text}
                </div>
              </div>
            </div>

            <div className="flex  items-center mt-10 place-content-around ">
              <div className="flex flex-col items-center gap-7 p-2 bg-violet-300 rounded-lg border-2 border-zinc-400">
                <span className="text-sm"> wind speeds</span>
                <i className="fa-solid fa-wind fa-2xl"></i>
                <span className="text-sm">{weather.current.wind_kph}k/h</span>
              </div>
              <div className="flex flex-col items-center gap-7 p-2 bg-violet-300 rounded-lg border-2 border-zinc-400">
                <span className="text-sm"> precipitation</span>
                <i className="fa-solid fa-umbrella fa-2xl"></i>
                <span className="text-sm">{weather.current.precip_mm}mm</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default WeatherCard;
