//openweathermap k name = weatherKey
// key - f4d2316cd893af3bab99aa493b1486ad

var apiKey = "f4d2316cd893af3bab99aa493b1486ad"


//create variables to hold the user input

//add different query parameters based on user input

var city; //specify state/country variables in API call 
//api request by city name:
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

//api request by city name, country code 
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

//api request by city name, state code (US only) country code 
//https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


// fetch(queryURL)
