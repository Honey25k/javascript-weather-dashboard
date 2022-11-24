var apiKey = '9fbbc9e521bd2169ee98d90be530aa58';
var searchButton = document.querySelector('#search-button');
var cityInput = document.querySelector('#city-input');
var currentDay = document.querySelector('#current-day-front');
var latestTemperature = document.querySelector('#current-temp');
var windSpeed = document.querySelector('#wind-speed');
var humidity = document.querySelector('#current-humidity');


var fiveDayForecast = document.querySelectorAll('#forecast-date');


var getLatLon = function (event) {
    var searchEl = document.querySelector('#weather-search');
    var userInput = searchEl.value;
    var cityUrl = 'https://api.openweathermap.org/geo/1.0/direct';
    cityUrl = cityUrl + '?q=' + userInput + '&limit=1&appid=' + apiKey
    

    fetch(cityUrl) 
    .then(function (response) {
        return response.json()
    })
    .then(function (response) {
        getcurrentForecast(response[0].lat, response[0].lon); 
        getForecast(response[0].lat, response[0].lon);
    })   
}


var getcurrentForecast = function (lat, lon) {
    var forecastLink = 'https://api.openweathermap.org/data/2.5/weather'; 
    forecastLink = forecastLink + '?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
     

    fetch(forecastLink)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        cityInput.textContent = response.name;
        var today = dayjs().format('M/D/YYYY');
        currentDay.textContent = today;
        console.log(currentDay);
        var iconCode = response.weather[0].icon;
        var weatherIconUrl = 'https://openweathermap.org/img/wn/' + iconCode + '.png'
        document.querySelector('img').src = weatherIconUrl;
        latestTemperature.textContent = 'Temperature: ' + response.main.temp + ' °F'
        windSpeed.textContent = 'Wind Speed: ' + response.wind.speed + ' MPH'
        humidity.textContent = 'Humidity: ' + response.main.humidity + ' %'
    })
}



var getForecast = function (lat, lon) {
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'; 
    forecastUrl = forecastUrl + '?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    

    fetch(forecastUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (response) {
        console.log(response);
        
        
        for (var i = 1; i < 6; i++) {
            var futureFiveDays = dayjs().add([i], 'day').format('M/D/YYYY');
            fiveDayForecast[i-1].innerHTML = futureFiveDays;
        }
        
        var forecastIcon = response.list[4].weather[0].icon;
        var weatherIconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        document.querySelector('#weather-icon-1').src = weatherIconUrl;
        
        forecastIcon = response.list[12].weather[0].icon;
        weatherIconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        document.querySelector('#weather-icon-2').src = weatherIconUrl;
        
        forecastIcon = response.list[20].weather[0].icon;
        weatherIconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        document.querySelector('#weather-icon-3').src = weatherIconUrl;
        
        forecastIcon = response.list[28].weather[0].icon;
        weatherIconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        document.querySelector('#weather-icon-4').src = weatherIconUrl;
        
        forecastIcon = response.list[36].weather[0].icon;
        weatherIconUrl = 'https://openweathermap.org/img/wn/' + forecastIcon + '.png';
        document.querySelector('#weather-icon-5').src = weatherIconUrl;

        
        
        var forecastTemp = document.querySelectorAll('#forecast-temp-1');
        forecastTemp[0].innerHTML = 'Temp: ' + response.list[4].main.temp + ' °F';
        var forecastWind = document.querySelectorAll('#forecast-wind-1');
        forecastWind[0].innerHTML = 'Wind: ' + response.list[4].wind.speed + ' MPH';
        var forecastHumidity = document.querySelectorAll('#forecast-humidity-1');
        forecastHumidity[0].innerHTML = 'Humidity: ' + response.list[4].main.humidity + ' %';

        forecastTemp = document.querySelectorAll('#forecast-temp-2');
        forecastTemp[0].innerHTML = 'Temp: ' + response.list[12].main.temp + ' °F';
        forecastWind = document.querySelectorAll('#forecast-wind-2');
        forecastWind[0].innerHTML = 'Wind: ' + response.list[12].wind.speed + ' MPH';
        forecastHumidity = document.querySelectorAll('#forecast-humidity-2');
        forecastHumidity[0].innerHTML = 'Humidity: ' + response.list[12].main.humidity + ' %';

        forecastTemp = document.querySelectorAll('#forecast-temp-3');
        forecastTemp[0].innerHTML = 'Temp: ' + response.list[20].main.temp + ' °F';
        forecastWind = document.querySelectorAll('#forecast-wind-3');
        forecastWind[0].innerHTML = 'Wind: ' + response.list[20].wind.speed + ' MPH';
        forecastHumidity = document.querySelectorAll('#forecast-humidity-3');
        forecastHumidity[0].innerHTML = 'Humidity: ' + response.list[20].main.humidity + ' %';

        forecastTemp = document.querySelectorAll('#forecast-temp-4');
        forecastTemp[0].innerHTML = 'Temp: ' + response.list[28].main.temp + ' °F';
        forecastWind = document.querySelectorAll('#forecast-wind-4');
        forecastWind[0].innerHTML = 'Wind: ' + response.list[28].wind.speed + ' MPH';
        forecastHumidity = document.querySelectorAll('#forecast-humidity-4');
        forecastHumidity[0].innerHTML = 'Humidity: ' + response.list[28].main.humidity + ' %';

        forecastTemp = document.querySelectorAll('#forecast-temp-5');
        forecastTemp[0].innerHTML = 'Temp: ' + response.list[36].main.temp + ' °F';
        forecastWind = document.querySelectorAll('#forecast-wind-5');
        forecastWind[0].innerHTML = 'Wind: ' + response.list[36].wind.speed + ' MPH';
        forecastHumidity = document.querySelectorAll('#forecast-humidity-5');
        forecastHumidity[0].innerHTML = 'Humidity: ' + response.list[36].main.humidity + ' %';
    })
}

var searchListContainer = document.querySelector('#history-list');

function listOfHistory () {
    var citySearch = document.querySelector('#weather-search');
    var searchItem = document.createElement("button");
    searchItem.setAttribute('class', 'list-group-item m-2 btn btn-secondary');
    searchItem.textContent = citySearch.value;
    searchListContainer.appendChild(searchItem);
    localStorage.setItem('city', JSON.stringify(searchItem.textContent));
    var searchHistoryItem = JSON.parse(localStorage.getItem('city'));
    console.log(searchHistoryItem);
} 

searchButton.addEventListener('click', function () {
    getLatLon();
    listOfHistory();
})

searchListContainer.addEventListener('click', function (event) {
    console.log(event.target.textContent);
    var searchEl = document.querySelector('#weather-search');
    searchEl.value = event.target.textContent;
    getLatLon();
})