var searchButton = $("#btn")


//openweathermap k name = weatherKey
// key - f4d2316cd893af3bab99aa493b1486ad

var apiKey = "f4d2316cd893af3bab99aa493b1486ad"


//displays the current date in the horizontal div
  var today = dayjs().format("MM/DD/YYYY");
  $("#hereNow").text(`(${today})`);

//displays the next 5 dates in the card headers
  var startDate = dayjs().add(1, "day");
for (var i = 0; i < 5; i++){
  var futureDate = startDate.add(i, "day").format("MM/DD/YYYY");
  var futureDateEl = document.getElementsByClassName("future-date")[i];
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
    
    $(".temperature").html("Temp: " + data.main.temp + "\u00B0 F")
    $(".wind-speed").html("Wind: " + data.wind.speed +" mph")
    $(".humidity").html(`Humidity: ${data.main.humidity} %`)
    
    //the temp_max/min from Current weather api describe the max and min for current temp only - not for day
    // console.log(data.main.temp_max + "\u00B0" + "/"+data.main.temp_min + "\u00B0")
    
    getFiveDay(lat, lon);

  });
}

  function getFiveDay(lat, lon) {
    var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial" ;
    console.log(fiveDay)
  
    fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

        var averages = [];

      for (let i = 0; i < data.list.length; i+=8) {
        console.log(i);
          let temp = 0;
          let humidity = 0;
          let wind = 0;

        for(let j = 0; j < 8; j++){
          temp += data.list[i+j].main.temp;
          humidity += data.list[i+j].main.humidity;
          wind += data.list[i+j].wind.speed;
        }

          temp /= 8;
          humidity /= 8;
          wind /= 8;

       console.log(averages)
      }

      
  
    });
  }




searchButton.click(function(event){
    event.preventDefault();
    getWeather();
})