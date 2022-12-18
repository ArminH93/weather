// OpenWeatherMap API Key
// var key = config.api_key;
const api_key = 'f66b17fb8259679d32bb875ac3aff1bf';

const form = document.getElementById('city-form'); // Form Element from HTML
form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent Default Form Submission
    const city = document.getElementById('city-input').value; // City Input Value
    getWeather(city); // Get Weather for City
    //TODO: getForecast(city); // Get Forecast for City
});


//Make an API Call to OpenWeatherMap for the current weather
function getWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("city-name").innerHTML = data.name; // City Name
            document.getElementById("country").innerHTML = data.sys.country; // Country
            document.getElementById("weather-description").innerHTML = data.weather[0].description; // Weather Description
            document.getElementById("temperature-min").innerHTML = `The minimum temperature is: ${data.main.temp_min} °C`; // Temperature Min
            document.getElementById("temperature-max").innerHTML = `The maximum temperature is: ${data.main.temp_max} °C`; // Temperature Max
        });
}

// Default City
//getWeather('Luzern');

