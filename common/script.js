document.addEventListener('DOMContentLoaded', function () {
    var lat;
    var lon;
    var APIKEY = 'c55d175c056c02049300e4f9dd300bbc';

    navigator.geolocation.getCurrentPosition(success)

    var fButton = document.getElementById('fSelector');
    var cButton = document.getElementById('cSelector')

    fButton.addEventListener('click', function () {
        fButton.classList.add('btn-success');
        fButton.classList.remove('btn-danger');
        cButton.classList.add('btn-danger');
        cButton.classList.remove('btn-success');
        getWeather('F');
    })

    cButton.addEventListener('click', function () {
        fButton.classList.remove('btn-success');
        fButton.classList.add('btn-danger');
        cButton.classList.remove('btn-danger');
        cButton.classList.add('btn-success');
        getWeather('C');
    })

    function success(pos) {
        console.log(pos)
        setCoord(pos);
        getWeather('F');
    }

    function setCoord(pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
    }

    function getWeather(unit) {
        var request = new XMLHttpRequest();
        var url = 'http://api.wunderground.com/api/90ebc14a3bbbab9e/geolookup/forecast/conditions/q/' + lat + ',' + lon + '.json'

        request.open('GET', url, true)

        request.onload = function (e) {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    displayWeather(JSON.parse(request.responseText), unit);
                } else {
                    console.log(request.statusText);
                }
            }
        }

        request.onerror = function (e) {
            console.error(request.statusText);
        };

        request.send(null);
    }

    function displayWeather(res, unit) {
        var conditions = res['current_observation'];
        var forecast = res.forecast;
        var today = forecast.simpleforecast.forecastday[0]
        var weather = conditions.weather;
        var body = document.getElementsByTagName('body')[0];

        document.getElementById('city').innerText = res.location.city;

        document.getElementById('condition').innerText = weather;

        console.log(weather);

        if (weather.includes('Thunder')) {
            // Thunderstorm
            body.classList.add('background-thunder');

        } else if (weather.includes('Rain' || weather.includes('Drizzle'))) {
            // General Rain
            body.classList.add('background-rain');

        } else if (weather.includes('Snow')) {
            // Snow
            body.classList.add('background-snow');

        } else if (weather.includes('Clear')) {
            // Clear Skys
            body.classList.add('background-clear');

        } else if (weather.includes('Overcast') || weather.includes('Cloud')) {
            // Cloudy Skys
            body.classList.add('background-cloudy');

        }

        var temp;
        var minTemp;
        var maxTemp;

        if (unit == "F") {
            temp = conditions['temp_f'] + 'F';
            minTemp = today.low.fahrenheit + 'F';
            maxTemp = today.high.fahrenheit + 'F';
        } else if (unit == "C") {
            temp = conditions['temp_c'] + 'C';
            minTemp = today.low.celsius + 'C';
            maxTemp = today.high.celsius + 'C';
        }

        document.getElementById('currTemp').innerText = 'Temp: ' + temp;
        document.getElementById('minTemp').innerText = 'Min: ' + minTemp;
        document.getElementById('maxTemp').innerText = 'Max: ' + maxTemp;
    }

    function toF(K) {
        var C = toC(K);
        var F = C * (9 / 5) + 32;

        return F;
    }

    function toC(K) {
        return K - 273.15;
    }
});