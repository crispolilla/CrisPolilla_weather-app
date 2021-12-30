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
  else {if (iconCode === "50d" || iconCode === "50n") {iconText = "fas- fa-smog";}}}}}}}}}
  let iconEl = document.querySelector("#icon-today");
  iconEl.setAttribute("class", iconText);
}

function setCity (cityInput) {
  let cityEl = document.querySelector("#city");
  cityEl.innerHTML = `${cityInput}`;
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
  changeIcon(iconCode);
    let linkF = document.querySelector("#linkF");
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
  changeIcon(iconCode);
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

let unit = "metric"
let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showTemp);

let linkF = document.querySelector("#linkF");
linkF.addEventListener("click", changeUnit);