document.addEventListener('DOMContentLoaded', function () {
    var lat;
    var lon;
    var APIKEY = 'c55d175c056c02049300e4f9dd300bbc';

    navigator.geolocation.getCurrentPosition(success)

    function success(pos) {
        setCoord(pos);
        getWeather();
    }

    function setCoord(pos) {
        lat = pos.coords.latitude;
        lon = pos.coords.longitude;
    }

    function getWeather() {
        var request = new XMLHttpRequest();
        var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + APIKEY;

        request.open('GET', url,true)

        request.onload = function (e) {
            if (request.readyState === 4){
                if (request.status === 200) {
                    displayWeather(JSON.parse(request.responseText));
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

    function displayWeather(res) {
        console.log(res.name);
        console.log(res.main);
        document.getElementById('city').innerText = res.name;
        
        document.getElementById('currTemp').innerText = toF(res.main.temp);
        document.getElementById('minTemp').innerText = toF(res.main.temp_min);
        document.getElementById('maxTemp').innerText = toF(res.main.temp_max);
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