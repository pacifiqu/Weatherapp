const apiKey = '6b13b6ddfd184a45b91102653230408';
const apiURL = 'https://api.weatherapi.com/v1/current.json';

function getWeatherData(location) {
  const url = `${apiURL}?key=${apiKey}&q=${location}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}
function processWeatherData(data, useCelsius) {
    const location = data.location.name;
    const temperature = useCelsius ? data.current.temp_c : data.current.temp_f;
    const weatherDescription = data.current.condition.text;
  
    return {
      location,
      temperature,
      weatherDescription,
    };
  }
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const locationInput = document.getElementById('locationInput').value;
    const useCelsius = document.getElementById('unitToggle').checked;
  
    getWeatherData(locationInput)
      .then(data => {
        const weatherData = processWeatherData(data, useCelsius);
        displayWeatherInfo(weatherData);
      });
      
  });
  function displayWeatherInfo(weatherData) {
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.innerHTML = `
      <h2>Location: ${weatherData.location}</h2>
      <p>Temperature: ${weatherData.temperature} ${weatherData.unit}</p>
      <p>Weather: ${weatherData.weatherDescription}</p>
    `;
  }
s      