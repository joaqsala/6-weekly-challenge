var searchButton = $("#btn")


//openweathermap k name = weatherKey
// key - f4d2316cd893af3bab99aa493b1486ad

var apiKey = "f4d2316cd893af3bab99aa493b1486ad"


  //displays the current date in the header of the page
  var today = dayjs().format("MM/DD/YYYY");
  console.log(today)
  $("#hereNow").text(`(${today})`)

  var startDate = dayjs().add(1, "day");
for (var i = 0; i < 5; i++){
  var futureDate = startDate.add(i, "day").format("MM/DD/YYYY");
  console.log(futureDate)
  var futureDateEl = document.getElementsByClassName("futuredate")[i];
  $(futureDateEl).html("<h4>"+ futureDate + "</h4>");
}


function getWeather() {
//variable to hold user input
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