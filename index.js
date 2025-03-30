const displayTemperature = (response) => {
  let temperature = Math.round(response.data.temperature.current);

  let temperatureElement = document.querySelector("#temperature-now");
  temperatureElement.innerHTML = temperature;

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let currentDateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  currentDateElement.innerHTML = formatDate(date);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${Number(response.data.wind.speed.toFixed(1))} km/h`;

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  getForecast(response.data.city);
};

const searchCity = (city) => {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=4a87c08b5fa402fe2b9tdfe493b56ao7&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
};

const search = (event) => {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
};

searchCity("Kyiv");

const formatDate = (date) => {
  let minutes = date.getMinutes();
  let hours = date.getHours();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day}, ${hours}:${minutes}`;
};

const formatDay = (timestamp) => {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
};

const getForecast = (city) => {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=4a87c08b5fa402fe2b9tdfe493b56ao7&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};

const displayForecast = (response) => {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-t"><strong>${Math.round(
              day.temperature.maximum
            )}º</strong></div>
            <div class="weather-forecast-t">${Math.round(
              day.temperature.minimum
            )}º</div>
          </div>
        </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
};

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
