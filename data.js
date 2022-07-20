let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

let city = prompt("Enter a city");
city = city.toLowerCase();

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let cTemperature = Math.round(temperature);
  let fTemperature = Math.round((temperature * 9) / 5 + 32);

  alert(
    `It is currently ${cTemperature}°C (${fTemperature}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${city}`
  );
}

function displayWeather(response) {
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
}

function search(event) {
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

function celc(event) {
  event.preventDefault();
  let temperature = document.querySelector("#val");
  temperature.innerHTML = celsiusTemperature;
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
