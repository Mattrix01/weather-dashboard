let weather = {
  apiKey: "7e6847b6027bd0af581a71ea3d6caf97",
  // fetching weather
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  // Append function
  displayWeather: function (data) {
    // extracting name from this object and making it into a variable
    const { name } = data;
    // extracting icon and description from data, weather object
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    // speed taken out of that object data and made into a variable
    const { speed } = data.wind;
    //
    console.log(name, icon, description, temp, humidity, speed);
    // appending to document classes set up
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temperature").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
  },
  // function to get content of search bar
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};
// selectors, on search-box button to search for the search content in weather variable
document
  .querySelector(".search-box button")
  .addEventListener("click", function () {
    weather.search();
  });
// selector for pressing enter key, taking in event to the parameter.
document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    // if key is enter, do weather search function
    if (event.key == "Enter") {
      weather.search();
    }
  });
// when load page default to london
weather.fetchWeather("London");

// original plan
// var searchBoxEl = document.querySelector("#searchBox");
// var searchBtnEl = document.querySelector("#searchBtnEl");

// const currentWeatherContainer = $("#currentWeatherResults");
// const forecastContainer = $("#forecastEl");
// const searchContainer = $("#search-history");

// function getWeather(lat, lon) {
//use lat and lon on second fetch to get the data from the one call api
// use the data response - it will have current andfuture data on the object
//this data we use to render onto the html sections 'current' and 'forecast'
// }

// function buttonClickHandler() {
// get what value the user has tped in search box
// .trim etc remove uneeded spaces
//first - add the search to local storage
//second - use city name to get lat and lon from the api  - on the first fetch request we concatenate the url with the city
//destrcuture the response and get the latitude and loningitude for the city response.coord.lat, response.coord.lon pass them into getWeather function
// var lat = for example
//use lat and lon and pass them into another function which will get the current and future weather
// };

// searchBtnEl.addEventListener("click", buttonClickHandler);

// just getting data back and then generating html from the data we recieved.
// to find city longitude etc https://openweathermap.org/current
// get the data first from weather API https://openweathermap.org/api/one-call-api

// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7e6847b6027bd0af581a71ea3d6caf97
