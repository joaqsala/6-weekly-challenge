var searchButton = $("#btn")

//openweathermap k name = weatherKey
// key - f4d2316cd893af3bab99aa493b1486ad

var apiKey = "f4d2316cd893af3bab99aa493b1486ad"


//create variables to hold the user input

// console.log(city)
// var city = "Austin"

//add different query parameters based on user input

//specify state/country variables in API call 

//api request by city name:
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//api request by city name, country code 
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

//api request by city name, state code (US only) country code 
//https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

function getWeather() {
var formInput = $("#city-input");
var city = formInput.val()
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

var lat;
var lon;

fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    lat = data.coord.lat
    lon = data.coord.lon
    console.log(lat, lon);
    getFiveDay(lat, lon)
  });
}

  function getFiveDay(lat, lon) {
    var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    console.log(fiveDay)
  
    fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  }

searchButton.click(function(event){
    event.preventDefault();
    getWeather();
})