function goToWeather (event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput.value = cityInput.value.trim();
  if (cityInput.value) {
    window.location.href = `show-weather.html?city=${cityInput.value}`;
  }
  else {alert("Please enter a city");}
}

let citySearch = document.querySelector("#city-search");
citySearch-addEventListener("submit",goToWeather);
