let now = new Date();
let calendar = document.querySelector("p.date");
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
calendar.innerHTML = `${day}  ${hours}:${minutes}`;

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log("Inside display forecast");
  debugger;
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-3">
        <div class="weather-forecast-date">${formatDate(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="50"
        />
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </div> 
          <div class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${key}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function displayWeather(response) {
  debugger;
  let weatherShow = document.querySelector("#val");
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  weatherShow.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(event) {
  debugger;
  event.preventDefault();
  let place = document.querySelector("#search-city-input");

  let h2 = document.querySelector("h2");
  h2.innerHTML = `Searching for ${place.value}...`;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `Daily Forecast for ${place.value}`;

  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${place.value}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function celc(event) {
  event.preventDefault();
  let temperature = document.querySelector("#val");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

function fart(event) {
  event.preventDefault();
  let temperature = document.querySelector("#val");
  let farenhaitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(farenhaitTemp);
}

let fartemp = document.querySelector("#far");
fartemp.addEventListener("click", fart);

let celtemp = document.querySelector("#cel");
celtemp.addEventListener("click", celc);

let celsiusTemperature = null;
