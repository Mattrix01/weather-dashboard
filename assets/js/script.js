const apiKey = "7e6847b6027bd0af581a71ea3d6caf97";
// fetching weather
function fetchWeather(city) {
  console.log(this);
  console.log(city);

  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=metric&appid=" +
      apiKey
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather found.");
        throw new Error("No weather found.");
      }
      return response.json();
    })
    .then((data) => {
      this.displayWeather(data);
      this.displayForecast(data.coord.lat, data.coord.lon);
    });
}
// Append function
function displayWeather(data) {
  // what data is fetching
  // console.log(data);
  // extracting name from this object and making it into a variable
  const { name } = data;
  // extracting icon and description from data, weather object
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  // speed taken out of that object data and made into a variable
  const { speed } = data.wind;

  // appending to document classes set up
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temperature").innerText = temp + "°C";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
}
function displayForecast(lat, lon) {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=alerts,minutely,hourly&units=metric&appid=" +
      apiKey
  )
    .then((response) => {
      if (!response.ok) {
        alert("No weather forecast");
      }
      return response.json();
    })
    .then((data) => {
      this.displayUv(data.current.uvi);
      this.createForecastCards(data.daily);
    });
}
function displayUv(data) {
  console.log(document.querySelector(".uv"));
  if (data >= 7) {
    document.querySelector(".uv").setAttribute("class", "high uv");
  } else if (data >= 2) {
    document.querySelector(".uv").setAttribute("class", "moderate uv");
  } else if (data < 2) {
    document.querySelector(".uv").setAttribute("class", "low uv");
  }

  document.querySelector(".uv").innerText = data;
}
function createForecastCards(dailyForecast) {
  const forecastCardsString = [];

  for (var i = 0; i < 5; i++) {
    // create the elments for html, or each forecast create a new card div
    // inside that create h2 and give text of data of forecast.
    // create h1 for temperature
    // create image elemnet for icon
    // a div for the humidity, div for wind, div for UV
    // append all of elemnts into card div created in html
    // append parent div into section of <section> in html, do for each iteration of the daily forecast,, as its in the for loop
    const forecastCard = ` <div class="card2">
  <div class="weather">
    <h2 class="city">Weather in London </h2>
    <h1 class="temperature">${dailyForecast[i].feels_like.day}°c</h1>
    <img src="" alt="" class="icon" />
    <div class="description">${dailyForecast[i].weather[0].description}</div>
    <div class="humidity">Humidity: ${dailyForecast[i].humidity}</div>
    <div class="wind">Wind speed: ${dailyForecast[i].wind_speed}</div>
  </div>
</div>`;
    forecastCardsString.push(forecastCard);
  }

  const section = document.querySelector(".forecastSection");
  section.innerHTML = forecastCardsString.join("");
}
// function to get content of search bar
function search() {
  this.fetchWeather(document.querySelector(".search-bar").value);
}
function addToLocalStorage() {
  const searchCity = document.querySelector(".search-bar").value;

  // Get list of searches from local storage or create empty array
  let searchHistory = JSON.parse(localStorage.getItem("searches")) || [];
  //Check if recent searched city is already in the search history
  if (searchHistory.indexOf(searchCity) !== -1) {
    return;
  }
  searchHistory.push(searchCity);
  // store array back in local storage
  localStorage.setItem("searches", JSON.stringify(searchHistory));
  // call the generateHistoryButtons function to regenerate the previous search buttons
  this.generateHistoryButtons();
}
function generateHistoryButtons() {
  let searchHistory = JSON.parse(localStorage.getItem("searches")) || [];

  const historySection = document.querySelector(".history");
  historySection.innerHTML = "";

  for (let i = 0; i < searchHistory.length; i++) {
    var btn = document.createElement("button");
    btn.setAttribute("value", searchHistory[i]);
    btn.textContent = searchHistory[i];
    btn.onclick = this.fetchWeather;

    historySection.appendChild(btn);
  }
}

// selectors, on search-box button to search for the search content in weather variable
document
  .querySelector(".search-box button")
  .addEventListener("click", function () {
    search();
    addToLocalStorage();
  });
// selector for pressing enter key, taking in event to the parameter.
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    // if key is enter, do weather search function
    if (event.key == "Enter") {
      search();
      addToLocalStorage();
    }
  });

getLastStorage = function () {
  // return value of last search to put in fetchWeather
  // glasgow just placeholder

  return "glasgow";
};
generateHistoryButtons();
// when load page default to london
// criteria, whenever the user loads page, it brings up the last weather search
fetchWeather(getLastStorage());
