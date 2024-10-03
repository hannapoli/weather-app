function displayTemperature(response) {
    let temperature = Math.round(response.data.temperature.current);
  
    let temperatureElement = document.querySelector("#temperature-now");
    temperatureElement.innerHTML = temperature;
  
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;

    let descriptionElement = document.querySelector("#weather-description");
    descriptionElement.innerHTML = response.data.condition.description;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${Number(response.data.wind.speed.toFixed(1))} km/h`;

    console.log(response.data);
  }
  
  function searchCity(city) {
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=4a87c08b5fa402fe2b9tdfe493b56ao7&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }

  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    
    searchCity(searchInputElement.value);
  }

  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  searchCity("Kyiv");
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  