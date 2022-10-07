
var happenedOnce = 0;
var cityName;
var latitude;

var weatherURL;


var cityP = document.createElement("h2")
var tempP = document.createElement("p")
var windP = document.createElement("p")
var humidityP = document.createElement("p")

async function loadLatLon(place) {
    var cordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=41473ca700c922a2192404a846e94a4a`;
    var response = await fetch(cordURL);
    var city = await response.json();
    console.log(response);
    return city
}

async function loadWeatherData() {
    var response = await fetch(weatherURL)
    var weatherData = await response.json()
    console.log(response)
    return weatherData
}

document.getElementById("submitButton").addEventListener("click", async () => {





    cityName = document.getElementById("cityInput").value
    
    if (happenedOnce > 0) {
        cityP.remove()
        tempP.remove()
        windP.remove()
        humidityP.remove()
    }

    var pastSearchButton = document.createElement("button")

    pastSearchButton.innerHTML = cityName
    pastSearchButton.className = "btn btn-secondary";
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

    searchLatLonSearchWeather(cityName)
  
})


async function searchLatLonSearchWeather (place) {
    let city = [];
    let weather = []
    try {
        city = await loadLatLon(place)
    }
    catch (e) {
        console.log("error")
        console.log(e)
    }

    latitude = city[0].lat
    longitude = city[0].lon
    console.log(latitude)
    console.log(longitude)
    weatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=41473ca700c922a2192404a846e94a4a&units=imperial`;
    try {
        weather = await loadWeatherData()
    }
    catch(e) {
        console.log("error")
        console.log(e)
    }

    let weatherObject = {city: cityName, latitude: latitude, longitude:longitude, temperature: weather.list[0].main.temp, wind: weather.list[0].wind.speed, humidity: weather.list[0].main.humidity}


    console.log(weather)
    console.log(weatherObject)
    console.log(weatherObject.temperature)
    console.log(weatherObject.wind)
    console.log(weatherObject.humidity)

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





// var latitude = data[0].lat;
// var longitude = data[0].lon;




