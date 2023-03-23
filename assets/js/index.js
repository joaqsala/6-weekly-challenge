var searchButton = $("#btn");

//openweathermap k name = weatherKey
// key - f4d2316cd893af3bab99aa493b1486ad

var apiKey = "f4d2316cd893af3bab99aa493b1486ad";

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

//used to make local storage global
var locations = [];

function getWeather() {
  //gets user input and sets it to: city
  var formInput = $("#city-input");
  city = formInput.val().trim();

  //pushes city into the array that is then set to local storage
  locations.push(city);
  localStorage.setItem("history", JSON.stringify(locations));

  //displays date and city upon click event
  var displayText = today + "   -   " + city;
  $("#here-now").text(displayText);

  //url for the day's local weather
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

  var lat;
  var lon;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //uses the data sent back to set the lat and long of user's city entry
      lat = data.coord.lat;
      lon = data.coord.lon;

      //URL to find the image icon for the day's weather
      var iconURL = "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

      //finds the p tags and adds the appropriate array info to them
      $("#main-icon").attr("src", iconURL);
      $(".temperature").html("Temp: " + data.main.temp + "\u00B0F");
      $(".wind-speed").html("Wind: " + data.wind.speed + " mph");
      $(".humidity").html(`Humidity: ${data.main.humidity}%`);

      //calls the 5-day forcast function sending the lat/ and the displayCity function to add a button underneath
      getFiveDay(lat, lon);
      displayCity(city);
    });
}

function getFiveDay(lat, lon) {
  //URL for the 5-day forcast
  var fiveDay = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial";
  console.log(fiveDay);

  fetch(fiveDay)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      //initializes the averages array
      var averages = [];

      //loops through five 24-hr periods that is dispersed in 3 hr increments
      for (let i = 0; i < data.list.length; i += 8) {
        let temp = 0;
        let humidity = 0;
        let wind = 0;

        let futureIcon = data.list[i].weather[0].icon;
      //loops through eight 3 hr increments
        for (let j = 0; j < 8; j++) {
          //adds the temp, humidity, and speed of each 8-hr period
          temp += data.list[i + j].main.temp;
          humidity += data.list[i + j].main.humidity;
          wind += data.list[i + j].wind.speed;
        }
        //finds the 24-hr average of each measurement 
        temp /= 8;
        humidity /= 8;
        wind /= 8;

        //splits the dt_text to get the date in 3 pieces (removing the time)
        const dateTimePieces = data.list[i + 7].dt_txt.split(" ")[0].split("-");
        //displays the time
        const futureDate = `${dateTimePieces[1]}/${dateTimePieces[2]}/${dateTimePieces[0]}`;

        //makes the averages array an object and pushes the 5-day info onto it
        averages.push({
          date: futureDate,
          icon: futureIcon,
          temperature: Math.round(temp),
          humidity: Math.round(humidity),
          wind: Math.round(wind),
        });
      }

      let cardsHTML = "";
      //for each averaged day, this loop will create a bootstrap card with each days info on it
      for (let i = 0; i < averages.length; i++) {
        var iconURL =
          "https://openweathermap.org/img/wn/" + averages[i].icon + "@2x.png";

        cardsHTML += ` <div class="col">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title"> ${averages[i].date} </h5>
                <img src=${iconURL} class="future-icon" alt=${averages[i].icon}/>   
                <p class="future-high-temp">Temp: ${averages[i].temperature} \u00B0F</p>
                <p class="future-wind">Wind: ${averages[i].wind} mph</p>
                <p class="future-humid">Humidity: ${averages[i].humidity}%</p>
            </div>
        </div>
      </div>`;
      }
      $("#forecast").html(cardsHTML);
    });
}

//displays the user input into the 'history' at the bottom of the search bar
function displayCity(userCity) {
  console.log(userCity);
  var cityListItems = document.createElement("button");
  cityListItems.classList.add("btn-secondary", "btn-block", "text-white-50", "p-1", "m-2");
  cityListItems.textContent = userCity;
  console.log(cityListItems);
  $("#city-list").append(cityListItems);

  // cityListItems.addEventListener('click', function(){
  //   city = userCity;
  //   getWeather();
  // })
}

// on page load, the localStorage is pulled and run through displays the user input into the 'history' at the bottom of the search bar
function renderCityList() {
  var cityHistory = [];
  if (localStorage.getItem("history")) {
    var cityHistory = JSON.parse(localStorage.getItem("history"));
  }
  //each item in localStorage gets passed through to the displayCity function
  for (var i = 0; i < cityHistory.length; i++) {
    displayCity(cityHistory[i]);
  }
}

//runs the function on page load
renderCityList();

//event listener for searchButton that runs the getWeather function
searchButton.click(function (event) {
  event.preventDefault();
  $("#hide").removeClass("d-none");
  getWeather();
});
