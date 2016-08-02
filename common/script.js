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
        setCoord(pos);
        getWeather('F');
    }

    function setCoord(pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
    }

    function getWeather(unit) {
        var request = new XMLHttpRequest();
        var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + APIKEY;

        request.open('GET', url,true)

        request.onload = function (e) {
            if (request.readyState === 4){
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
        document.getElementById('city').innerText = res.name;
        document.getElementById('condition').innerText = res.weather[0].description;

        var id = res.weather[0].id;
        var body = document.getElementsByTagName('body')[0];

        if (id < 300) {
            // Thunderstorm
            body.classList.add('background-thunder');

        } else if (id < 600 || id == 701) {
            // General Rain
            body.classList.add('background-rain');

        } else if (id < 700) {
            // Snow
            body.classList.add('background-snow');

        } else if (id == 800) {
            // Clear Skys
            body.classList.add('background-clear');

        } else if (id > 800 && id < 900) {
            // Cloudy Skys
            body.classList.add('background-cloudy');

        }

        var temp;
        var minTemp;
        var maxTemp;

        if (unit == "F") {
            temp = toF(res.main.temp).toFixed(1) + 'F';
            minTemp = toF(res.main.temp_min).toFixed(1) + 'F';
            maxTemp = toF(res.main.temp_max).toFixed(1) + 'F';
        } else if (unit == "C") {
            temp = toC(res.main.temp).toFixed(1) + 'C';
            minTemp = toC(res.main.temp_min).toFixed(1) + 'C';
            maxTemp = toC(res.main.temp_max).toFixed(1) + 'C';
        }

        document.getElementById('currTemp').innerText = 'Temp: ' + temp;
        document.getElementById('minTemp').innerText = 'Min: ' + minTemp;
        document.getElementById('maxTemp').innerText = 'Max: ' + maxTemp;
    }

    function toF (K) {
        var C = toC(K);
        var F = C * (9 / 5) + 32;

        return F;
    }

    function toC (K) {
        return K - 273.15;
    }
});