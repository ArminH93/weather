// OpenWeatherMap API Key
// var key = api_key;
const api_key = 'f66b17fb8259679d32bb875ac3aff1bf';

// const form = document.getElementById('city-form'); // Form Element from HTML
// form.addEventListener('submit', event => {
//     event.preventDefault(); // Prevent Default Form Submission
//     const city = document.getElementById('city-input').value; // City Input Value
//     getWeather(city); // Get Weather for City
//    // getForecast(city); // Get Forecast for City
// });


//Make an API Call to OpenWeatherMap for the current weather
// function getWeather(city) {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
//         .then(response => response.json())
//         .then(data => {
//             // Log data to the console
//             // console.log(data);
//             document.getElementById("city-name").innerHTML = data.name; // City Name
//             document.getElementById("country").innerHTML = data.sys.country; // Country
//             document.getElementById("weather-description").innerHTML = data.weather[0].description; // Weather Description
//             document.getElementById("temperature-min").innerHTML = `The minimum temperature is: ${data.main.temp_min} °C`; // Temperature Min
//             document.getElementById("temperature-max").innerHTML = `The maximum temperature is: ${data.main.temp_max} °C`; // Temperature Max
//          });
// }

// getWeather('Luzern');


//Make an API Call to OpenWeatherMap for the forecast - Every 3 hours for 5 days
function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=metric`)
        .then(response => response.json())
        .then(data => {
            // list is an array of 40 objects, each object is a forecast for 3 hours

            // Get the temperature for the first forecast in Lucerne as well as the population of the city
            console.log(`At ${data.list[1].dt_txt} the temperature will be: ${data.list[0].main.temp} °C`); // Temperature for the first forecast in Lucerne
            console.log(`The population of Lucerne, CH is: ${data.city.population}.`); // Population of the city
        });
}

getForecast('Luzern');
