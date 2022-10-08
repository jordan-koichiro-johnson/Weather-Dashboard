
var happenedOnce = 0;
var cityName;
var latitude;
var weatherURL;
var cityP = document.createElement("h2")
var tempP = document.createElement("p")
var windP = document.createElement("p")
var humidityP = document.createElement("p")


// function to get the latitude and longitude from a city name

async function loadLatLon(place) {
    var cordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=41473ca700c922a2192404a846e94a4a`;
    var response = await fetch(cordURL);
    var city = await response.json();
    console.log(response);
    return city
}

// function to fetch weather ddata using coords. returns object of weatherData

async function loadWeatherData() {
    var response = await fetch(weatherURL)
    var weatherData = await response.json()
    console.log(response)
    return weatherData
}


// creates event listener for submit button

document.getElementById("submitButton").addEventListener("click", async () => {

    cityName = document.getElementById("cityInput").value
    

    //if we have stuff in our boxes, take them out.

    if (happenedOnce > 0) {
        cityP.remove()
        tempP.remove()
        windP.remove()
        humidityP.remove()
    }

    // create our past search buttons with style

    var pastSearchButton = document.createElement("button")
    pastSearchButton.innerHTML = cityName
    pastSearchButton.className = "btn btn-secondary";
    pastSearchButton.style.width = '100%'
    pastSearchButton.style.margin = '10% 0'
    document.getElementById('pastSearches').style.margin = "5% 30%";

    // past search button onclick

    pastSearchButton.addEventListener("click", async () => {
        cityP.remove()
        tempP.remove()
        windP.remove()
        humidityP.remove()
        cityName = pastSearchButton.innerHTML
        searchLatLonSearchWeather(pastSearchButton.innerHTML)
        console.log(pastSearchButton.innerHTML)
    })

    document.getElementById("pastSearches").appendChild(pastSearchButton)

    //run weather function with param or city name

    searchLatLonSearchWeather(cityName)
  
})


async function searchLatLonSearchWeather (place) {
    
    
    // if error log it. if not get coords
    
    let city = [];
    let weather = []
    try {
        city = await loadLatLon(place)
    }
    catch (e) {
        console.log("error")
        console.log(e)
    }

    // create latitude and longitude to put into our api

    latitude = city[0].lat
    longitude = city[0].lon

    weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=41473ca700c922a2192404a846e94a4a&units=imperial`;

    // if error log it. if not get weather

    try {
        weather = await loadWeatherData()
    }
    catch(e) {
        console.log("error")
        console.log(e)
    }

    // create a weather object containing all important parts

    let weatherObject = {
        city: cityName, 
        latitude: latitude, 
        longitude:longitude, 
        temperature: weather.list[0].main.temp, 
        wind: weather.list[0].wind.speed, 
        humidity: weather.list[0].main.humidity
    }

    var cityBlock = document.getElementById("cityMain")
    var tempBlock = document.getElementById("tempMain")
    var windBlock = document.getElementById("windMain")
    var humidityBlock = document.getElementById("humidityMain")



    cityP.innerHTML = `${weatherObject.city}`
    tempP.innerHTML = `${weatherObject.temperature} Degrees Fahrenheit`
    windP.innerHTML = `${weatherObject.wind} MPH`
    humidityP.innerHTML = `${weatherObject.humidity}%`

    cityBlock.appendChild(cityP)
    tempBlock.appendChild(tempP)
    windBlock.appendChild(windP)
    humidityBlock.appendChild(humidityP)
}







