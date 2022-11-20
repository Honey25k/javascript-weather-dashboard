
var pastCitySearch = [];
var apiKey = "9fbbc9e521bd2169ee98d90be530aa58";

var searchField = document.querySelector('#search-field');
var fieldInput = document.querySelector('#field-input');
var currentDay = document.querySelector('#current-day');
var forecastField = document.querySelector('#forecast-field');
var pastCitySearchField = document.querySelector('#past-history');

// using custom dayjs plugin (https://day.js.org/docs/en/plugin/loading-into-browser) 
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

function sortPrevSearchHistory() {
    pastCitySearchField.innerHTML = '';

    for (var i = pastCitySearch.length - 1; i >= 0; i--){
        var searchBtn = document.createElement('button');
        searchBtn.setAttribute('type', 'button');
        searchBtn('aria-controls', 'today forecast');
        searchBtn.classList.add('history-btn', 'history-btn');

        searchBtn.setAttribute('data-search', pastCitySearch[i]);
        searchBtn.textContent = pastCitySearch[i];
        pastCitySearchField.append(searchBtn);
    }
}

