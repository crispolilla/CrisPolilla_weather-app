function setCity (cityInput) {
  let cityEl = document.querySelector("#city");
  cityEl.innerHTML = `${cityInput}`;
}

function formatDate (timestamp) {
  let date = new Intl.DateTimeFormat(`de-DE`, {
    day: "2-digit",
    month: "2-digit"
  }).format(timestamp);
  return date;
}

function formatWeekday (timestamp) {
  let weekday = new Intl.DateTimeFormat(`en-GB`, {
    weekday: "short",
  }).format(timestamp);
  return weekday;
}

function changeIcon (iconCode) {
  let iconText = "fas fa-cloud-sun";
  if (iconCode === "01d") {iconText = "fas fa-sun";}
  else {if (iconCode === "02d" || iconCode === "02n") {iconText = "fas fa-cloud-sun";}
  else {if (iconCode === "03d" || iconCode === "03n") {iconText = "fas fa-cloud";}
  else {if (iconCode === "04d" || iconCode === "04n") {iconText = "fas fa-cloud";}
  else {if (iconCode === "09d" || iconCode === "09n") {iconText = "fas fa-cloud-showers-heavy";}
  else {if (iconCode === "10d" || iconCode === "10n") {iconText = "fas fa-cloud-sun-rain";}
  else {if (iconCode === "11d" || iconCode === "11n") {iconText = "fas fa-cloud-showers-heavy";}
  else {if (iconCode === "13d" || iconCode === "13n") {iconText = "fas fa-snowflake";}
  else {if (iconCode === "50d" || iconCode === "50n") {iconText = "fas fa-smog";}}}}}}}}}
  return iconText;
}

function getForecast (coordinates) {
  let unit = "metric";
  let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showForecast);  
  console.log(apiUrl);
}

function showForecast (response) {
  let forecastRowEl = document.querySelector("#forecastRow");
  let forecastHTML = "";
  let forecastDays = response.data.daily;
  forecastDays.forEach(function(forecastDay, index) {
    if (index <= 3) {
      forecastHTML =
      forecastHTML +
      `
        <div class="col">
          <ul class="date-box">
            <li class="icon">
              <i class="${changeIcon(forecastDay.weather[0].icon)}"></i>
            </li>
            <li class="day"> ${formatWeekday(forecastDay.dt*1000)} </li>
            <li class="date"> ${formatDate(forecastDay.dt*1000)} </li>
          </ul> 
        </div>
        <div class="col temp-box">
          <ul class="temp-box">
            <li class="temp-max"> ${Math.round(forecastDay.temp.max)}° </li>
            <li class="temp-min"> ${Math.round(forecastDay.temp.min)}° </li>
          </ul>
        </div>
      `;
    }
  });
  forecastRowEl.innerHTML = forecastHTML;
}

function showTemp (response) {
  console.log(apiUrl);
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let windspeed = Math.round(response.data.wind.speed *3,6);
  let tempMaxEl = document.querySelector("#temp-max");
  let tempMinEl = document.querySelector("#temp-min");
  let descriptionEl = document.querySelector("#description");
  let rainfallEl = document.querySelector("#rain");
  let windspeedEl = document.querySelector("#wind");
  tempMaxEl.innerHTML = `${tempMax}° C`;
  tempMinEl.innerHTML = `${tempMin}°`;
  descriptionEl.innerHTML = `${response.data.weather[0].description}`;
  rainfallEl.innerHTML = ` ${response.data.main.humidity}%`;
  windspeedEl.innerHTML = ` ${windspeed} km/h`;
  setCity (response.data.name);
  let iconCode = response.data.weather[0].icon;
  let iconEl = document.querySelector("#icon-today");
  iconEl.setAttribute("class", changeIcon(iconCode));
  let linkF = document.querySelector("#linkF");
  getForecast(response.data.coord);
  showForecast();
  linkF.innerHTML = `show me in °F`;
}

function showTempF(response) {
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let windspeed = Math.round(response.data.wind.speed);
  let tempMaxEl = document.querySelector("#temp-max");
  let tempMinEl = document.querySelector("#temp-min");
  let descriptionEl = document.querySelector("#description");
  let rainfallEl = document.querySelector("#rain");
  let windspeedEl = document.querySelector("#wind");
  tempMaxEl.innerHTML = `${tempMax}° F`;
  tempMinEl.innerHTML = `${tempMin}°`;
  descriptionEl.innerHTML = `${response.data.weather[0].description}`;
  rainfallEl.innerHTML = ` ${response.data.main.humidity}%`;
  windspeedEl.innerHTML = ` ${windspeed} mi/h`;
  setCity(response.data.name);
  let iconCode = response.data.weather[0].icon;
  let iconEl = document.querySelector("#icon-today");
  iconEl.setAttribute("class", changeIcon(iconCode));
  let linkF = document.querySelector("#linkF");
  linkF.innerHTML = `show me in °C`;
}
  
function changeUnit (event) {
  event.preventDefault();
  let tempMaxEl = document.querySelector("#temp-max");
  if (tempMaxEl.innerHTML.includes("° C")) {
    let unit = "imperial";
    let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTempF);   
  }
  else {
    let unit = "metric";
    let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showTemp);   
  }
}
  
let cityEl = document.querySelector("#city");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const city = urlParams.get("city");
cityEl.innerHTML = `${city}`;
  
let dateTodayEl = document.querySelector("#date-today");
dateTodayEl.innerHTML = formatDate(new Date());

let unit = "metric";
let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showTemp);

let linkF = document.querySelector("#linkF");
linkF.addEventListener("click", changeUnit);