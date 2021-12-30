function goToWeather (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput.value = cityInput.value.trim();
  if (cityInput.value) {
    window.location.href = `show-weather.html?city=${cityInput.value}`;
  }
  else {alert("Please enter a city");}
}

function logMyLocation (response) {
  let cityInput = response.data.name;
  window.location.href = `show-weather.html?city=${cityInput}`;
}

function findMyLocation (position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = `87bb877dc5b8cdcd202ebaa9f56f9365`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(logMyLocation);
}

function fetchMyLocation (event) {
  navigator.geolocation.getCurrentPosition(findMyLocation);
}

let citySearch = document.querySelector("#city-search");
citySearch-addEventListener("submit",goToWeather);

let myLocation = document.querySelector("#my-location");
myLocation.addEventListener("click", fetchMyLocation);

