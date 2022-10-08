var happenedOnce = 0;
var cityName;
var latitude;
var weatherURL;
var cityP = document.createElement("h2")
var weatherIcon = document.createElement("img")
var dateP = document.createElement("h2")
var tempP = document.createElement("p")
var windP = document.createElement("p")
var humidityP = document.createElement("p")
var searchButtonPressed = 0

// function to get the latitude and longitude from a city name

async function loadLatLon(place) {
    var cordURL = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=41473ca700c922a2192404a846e94a4a`;
    var response = await fetch(cordURL);
    var city = await response.json();
    return city
}

// function to fetch weather ddata using coords. returns object of weatherData

async function loadWeatherData() {
    var response = await fetch(weatherURL)
    var weatherData = await response.json()
    return weatherData
}

// creates event listener for submit button

document.getElementById("submitButton").addEventListener("click", async () => {

    cityName = document.getElementById("cityInput").value

    //run weather function with param or city name

    

    searchLatLonSearchWeather(cityName)

})


function CreatePastSearchButton(){
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
        searchButtonPressed = 1
    })

    document.getElementById("pastSearches").appendChild(pastSearchButton)
}




async function searchLatLonSearchWeather (place) {
    
    var weatherArray = []
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

    if (city.length > 0) {

        if (searchButtonPressed === 0) {
        CreatePastSearchButton();
        }
    //if we have stuff in our boxes, take them out.

        searchButtonPressed = 0

    if (happenedOnce > 0) {
        cityP.remove()
        tempP.remove()
        windP.remove()
        humidityP.remove()
    }



    
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

    console.log(weather)

    console.log(weather.list[0].dt_txt)

    for (let i = 0; i <= 5; i ++) {
        m = i*8
        
        if (m === 40) {
            m = m-1
        }

        weatherArray.push(
            {
                city: cityName,
                latitude: latitude,
                longitude: longitude,
                time: `${weather.list[m].dt_txt} GMT`,
                temperature: weather.list[m].main.temp,
                wind: weather.list[m].wind.speed, 
                humidity: weather.list[m].main.humidity,
                condition: weather.list[m].weather[0].icon,
            }
  
        )
        console.log(weather.list[m].dt_txt)
    }
    // create dom elements and put them where they belong for weather

    let cityBlock = document.getElementById("cityMain")
    let tempBlock = document.getElementById("tempMain")
    let windBlock = document.getElementById("windMain")
    let humidityBlock = document.getElementById("humidityMain")

    cityP.innerHTML = `${weatherArray[0].city} ${weatherArray[0].time}`
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherArray[0].condition}@2x.png`
    tempP.innerHTML = `${weatherArray[0].temperature} &deg; Fahrenheit`
    windP.innerHTML = `${weatherArray[0].wind} MPH`
    humidityP.innerHTML = `${weatherArray[0].humidity}%`

    cityBlock.appendChild(cityP)
    cityBlock.appendChild(weatherIcon)
    tempBlock.appendChild(tempP)
    windBlock.appendChild(windP)
    humidityBlock.appendChild(humidityP)

    for (let n = 0; n < 5; n++) {
        putStuffInBoxes(weatherArray, n)
    }
    happenedOnce ++;
}

}

function putStuffInBoxes (arr, x) {

    let dateBlock = document.getElementById(`city-day-${x + 1}`)
    let tempBlock = document.getElementById(`temp-day-${x + 1}`)
    let windBlock = document.getElementById(`wind-day-${x + 1}`)
    let humidityBlock = document.getElementById(`humidity-day-${x + 1}`)

    if (happenedOnce > 0) {
        dateBlock.removeChild(dateBlock.lastChild)
        dateBlock.removeChild(dateBlock.lastChild)
        tempBlock.removeChild(tempBlock.lastChild)
        windBlock.removeChild(windBlock.lastChild)
        humidityBlock.removeChild(humidityBlock.lastChild)
    }



    let datePa = document.createElement("h2")
    let weatherIconn = document.createElement("img")
    let tempPa = document.createElement("p")
    let windPa = document.createElement("p")
    let humidityPa = document.createElement("p")


    console.log("start putting in boxes")
    console.log(arr[x])

    datePa.innerHTML = `${arr[x+1].time}`
    tempPa.innerHTML = `${arr[x+1].temperature} &deg; Fahrenheit`
    windPa.innerHTML = `${arr[x+1].wind} MPH`
    humidityPa.innerHTML = `${arr[x+1].humidity}%`
    weatherIconn.src = `http://openweathermap.org/img/wn/${arr[x+1].condition}@2x.png`

    dateBlock.appendChild(datePa)
    dateBlock.appendChild(weatherIconn)
    tempBlock.appendChild(tempPa)
    windBlock.appendChild(windPa)
    humidityBlock.appendChild(humidityPa)

    

}





