var searchButton = $("#btn")


//openweathermap k name = weatherKey
// key - f4d2316cd893af3bab99aa493b1486ad

var apiKey = "f4d2316cd893af3bab99aa493b1486ad"


//displays the current date in the horizontal div
  var today = dayjs().format("MM/DD/YYYY");
  $("#here-now").text(today);

//displays the next 5 dates in the card headers
//   var startDate = dayjs().add(1, "day");
// for (var i = 0; i < 5; i++){
//   var futureDate = startDate.add(i, "day").format("MM/DD/YYYY");
//   var futureDateEl = document.getElementsByClassName("future-date")[i];
//   $(futureDateEl).html("<h4>"+ futureDate + "</h4>");
// }


var city;

function getWeather() {
  var formInput = $("#city-input");
  city = formInput.val().trim();

  var displayText = today + "   -   " + city;
  $("#here-now").text(displayText);

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

    var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"

    $("#main-icon").attr("src", iconURL)
    $(".temperature").html("Temp: " + data.main.temp + "\u00B0F")
    $(".wind-speed").html("Wind: " + data.wind.speed +" mph")
    $(".humidity").html(`Humidity: ${data.main.humidity}%`)
    
    
    getFiveDay(lat, lon);
    displayCity(city);
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

          let futureIcon = data.list[i].weather[0].icon

        for(let j = 0; j < 8; j++){
          temp += data.list[i+j].main.temp;
          humidity += data.list[i+j].main.humidity;
          wind += data.list[i+j].wind.speed;
        }

          temp /= 8;
          humidity /= 8;
          wind /= 8;

        const dateTimePieces = data.list[i+7].dt_txt.split(" ")[0].split("-");
        const futureDate = `${dateTimePieces[1]}/${dateTimePieces[2]}/${dateTimePieces[0]}`

       averages.push({
        date: futureDate,
        icon: futureIcon,
        temperature: Math.round(temp),
        humidity: Math.round(humidity),
        wind: Math.round(wind),
       })

       console.log(averages)
      }

      
      let cardsHTML = "";
      for (let i = 0; i < averages.length; i++){

        var iconURL = "https://openweathermap.org/img/wn/" + averages[i].icon + "@2x.png"
        
        cardsHTML += ` <div class="col">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"> ${ averages[i].date} </h5>
                <img src=${iconURL} class="future-icon" alt=${averages[i].icon}/>   
                <p class="future-high-temp">Temp: ${averages[i].temperature} \u00B0F</p>
                <p class="future-wind">Wind: ${averages[i].wind} mph</p>
                <p class="future-humid">Humidity: ${averages[i].humidity}%</p>
            </div>
        </div>
      </div>`
      }
      $("#forecast").html(cardsHTML)      
  
    });
  }

function displayCity(userCity){
  console.log(userCity)
  var cityListItems = document.createElement("button");
  cityListItems.classList.add("btn-secondary", "btn-block", "text-white-50", "p-2", "m-2");
  cityListItems.textContent = userCity;
  console.log(cityListItems);
  $("#city-list").append(cityListItems);
}


searchButton.click(function(event){
    event.preventDefault();
    $("#hide").removeClass("d-none");
    getWeather();
})