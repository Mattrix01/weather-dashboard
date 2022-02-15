const APIkey = "7e6847b6027bd0af581a71ea3d6caf97";
var searchBoxEl = document.querySelector("#searchBox");
var searchBtnEl = document.querySelector("#searchBtnEl");

const currentWeatherContainer = $("#currentWeatherResults");
const forecastContainer = $("#forecastEl");
// const searchContainer = $("#search-history");

function getWeather(lat, lon) {
  //use lat and lon on second fetch to get the data from the one call api
  // use the data response - it will have current andfuture data on the object
  //this data we use to render onto the html sections 'current' and 'forecast'
}

function buttonClickHandler() {
  // get what value the user has tped in search box
  // .trim etc remove uneeded spaces
  //first - add the search to local storage
  //second - use city name to get lat and lon from the api  - on the first fetch request we concatenate the url with the city
  //destrcuture the response and get the latitude and loningitude for the city response.coord.lat, response.coord.lon pass them into getWeather function
  // var lat = for example
  //use lat and lon and pass them into another function which will get the current and future weather
}

searchBtnEl.addEventListener("click", buttonClickHandler);

// just getting data back and then generating html from the data we recieved.
// to find city longitude etc https://openweathermap.org/current
// get the data first from weather API https://openweathermap.org/api/one-call-api

// Endpoint:
// - Please, use the endpoint api.openweathermap.org for your API calls
// - Example of API call:
// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=7e6847b6027bd0af581a71ea3d6caf97
