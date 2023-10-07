const condition = document.getElementById("condition");
const city = document.getElementById("city");
const country = document.getElementById("country");
const mainText = document.getElementById("main");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");

const cityInput = document.getElementById("city-input");
const historyElm = document.getElementById("history");
const masterHistory = document.getElementById("master-history");

const API_KEY = "6fc35f2bd8365b2710d68f28172e94ff";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

const ICON_URL = "http://openweathermap.org/img/wn/";

const DEFAULT_CITY = "Dhaka,BD";

let time = new Date();
setInterval(() => {
  document.getElementById(
    "tm"
  ).innerHTML = ` ${time.toLocaleTimeString()}   ${time.toDateString()}`;
}, 1000);

window.onload = function () {
  navigator.geolocation.getCurrentPosition(
    (s) => {
      getWeatherData(null, s.coords);
    },
    (e) => {
      getWeatherData(DEFAULT_CITY);
    }
  );

  cityInput.addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      if (e.target.value) {
        getWeatherData(e.target.value);
        e.target.value = "";
      } else {
        alert("Please Enter a Valid City Name");
      }
    }
  });
};

function getWeatherData(city = DEFAULT_CITY, coords) {
  let url = BASE_URL;
  city == null
    ? (url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}`)
    : (url = `${url}&q=${city}`);
  axios
    .get(url)
    .then(({ data }) => {
      let weather = {
        icon: data.weather[0].icon,
        name: data.name,
        country: data.sys.country,
        main: data.weather[0].main,
        description: data.weather[0].description,
        temp: data.main.temp,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
      };
      setWeather(weather);
    })
    .catch((e) => {
      console.log(e);
      alert("city Not Found");
    });
}

function setWeather(weather) {
  condition.src = `${ICON_URL}${weather.icon}.png`;
  city.innerHTML = weather.name;
  country.innerHTML = weather.country;
  mainText.innerHTML = weather.main;
  description.innerHTML = weather.description;
  temp.innerHTML = `${Math.floor(weather.temp - 273.15)}c`;
  pressure.innerHTML = weather.pressure;
  humidity.innerHTML = `${weather.humidity}%`;
}
