

var cityName = "Seattle"


var cordURL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=41473ca700c922a2192404a846e94a4a`;

fetch(cordURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });





var latitude = data[0].lat;
var longitude = data[0].lon;



var weatherURL = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=41473ca700c922a2192404a846e94a4a`;
