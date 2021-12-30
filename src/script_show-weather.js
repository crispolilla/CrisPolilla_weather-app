function showTemp (response) {
  let tempMax = Math.round(response.data.main.temp_max);
  let tempMin = Math.round(response.data.main.temp_min);
  let tempMaxEl = document.querySelector("#temp-max");
  let tempMinEl = document.querySelector("#temp-min");
  let descriptionEl = document.querySelector("#description");
  let rainfallEl = document.querySelector("#rain");
  tempMaxEl.innerHTML = `${tempMax}° C`;
  tempMinEl.innerHTML = `${tempMin}°`;
  descriptionEl.innerHTML = `${response.data.weather[0].description}`;
  rainfallEl.innerHTML = ` ${response.data.main.humidity}%`;
  let cityEl = document.querySelector("#city");
  cityEl.innerHTML = `${response.data.name}`;
}

let cityEl = document.querySelector("#city");
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const city = urlParams.get("city");
cityEl.innerHTML = `${city}`;
console.log(city);

let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemp);