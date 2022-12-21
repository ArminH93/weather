// OpenWeatherMap API Key
var api_key = config.api_key;

const form = document.getElementById('city-form'); // Form Element from HTML
form.addEventListener('submit', event => {
    event.preventDefault(); // Prevent Default Form Submission
    const city = document.getElementById('city-input').value; // City Input Value
    getForecast(city); // Get Forecast for City
});

//Make an API Call to OpenWeatherMap for the forecast - Every 3 hours for 5 days
function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${config.api_key}&units=metric`)
        .then(response => response.json())
        .then(data => {

            /*  
                CONSOLE OUTPUT FOR TESTING PURPOSES - Get the temperature for the first forecast in Lucerne as well as the population of the city
                console.log(`At ${data.list[1].dt_txt} the temperature will be: ${data.list[0].main.temp} °C`); // Temperature for the weather in 3 hours in Lucerne
                console.log(`The population of Lucerne, CH is: ${data.city.population}.`); // Population of the city 
            */

            // For loop to iterate through the forecast data and extract the data for each day (every 3 hours)
            for (let i = 0; i < data.list.length; i++) {
                const forecast = data.list[i];
                const date = forecast.dt_txt; // Date and time of the forecast
                const minTemp = forecast.main.temp_min; // Minimum temperature 
                const maxTemp = forecast.main.temp_max; // Maximum temperature
                const weather = forecast.weather[0].description; // Weather description 
                let rainVolume = forecast.rain ? forecast.rain["3h"] : 0; // If there is no rain, the rain volume is 0


                const forecastDuration = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
                const probability = rainVolume / (forecastDuration / 1000 / 60 / 60) * 100; // Calculate the probability of rain in %

                // Round the probability to 1 decimal places
                let roundedProbability = probability.toFixed(1);

                // If the probability is higher than 100%, set it to 100%
                if (probability > 100) {
                    roundedProbability = 100;
                }

                // Create a new row in the table for each forecast
                const row = document.createElement("tr");

                /* 
                    Create a new cell for each data point. 
                    The data points are: date, minimum temperature, maximum temperature, weather descript.ion, probability of rain
                */
                const dateCell = document.createElement("td");
                dateCell.textContent = date;
                row.appendChild(dateCell);

                const minTempCell = document.createElement("td");
                minTempCell.textContent = `${minTemp} °C`;
                row.appendChild(minTempCell);

                const maxTempCell = document.createElement("td");
                maxTempCell.textContent = `${maxTemp} °C`;
                row.appendChild(maxTempCell);

                const weatherCell = document.createElement("td");
                weatherCell.textContent = weather;
                row.appendChild(weatherCell);

                const rainCell = document.createElement("td");
                rainCell.textContent = `${roundedProbability}%`;
                row.appendChild(rainCell);

                // Add the new row to the table body
                document.querySelector("#forecast-table tbody").appendChild(row);
            }

        });
}

/*  
    CONSOLE OUTPUT FOR TESTING PURPOSES
    getForecast('Luzern');
*/
