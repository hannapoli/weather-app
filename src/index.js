function displayTemperature(response) {
    let temperature = Math.round(response.data.temperature.current);
  
    let temperatureElement = document.querySelector("#temperature-now");
    temperatureElement.innerHTML = temperature;
  
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = response.data.city;
  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let city = searchInputElement.value;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=4a87c08b5fa402fe2b9tdfe493b56ao7&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
  }
  
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
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  