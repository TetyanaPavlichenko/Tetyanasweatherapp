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

// let city = prompt("Enter a city");
// city = city.toLowerCase();
let city = "Lviv";

if (weather[city] !== undefined) {
  let temperature = weather[city].temp;
  let humidity = weather[city].humidity;
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
  let temperature = Math.round(response.data.main.temp);
  weatherShow.innerHTML = `${temperature}`;
}

function search(event) {
  event.preventDefault();
  let place = document.querySelector("#search-city-input");

  alert(place.value);

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
  let v1 = document.querySelector("#val");
  v1.innerHTML = "27";
}
let celtemp = document.querySelector("#cel");
celtemp.addEventListener("click", celc);

function fart(event) {
  event.preventDefault();
  let v2 = document.querySelector("#val");
  v2.innerHTML = "80";
}

let fartemp = document.querySelector("#far");
fartemp.addEventListener("click", fart);
