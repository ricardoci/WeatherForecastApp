const apiKey = "bec6baa443da28a01e0f2cd9b39dc903";
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');

let weatherData;

searchButton.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();

    let query = searchBar.value.toLowerCase();

    if (!query) {
        return console.log('Please type a location');
    }

    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial&limit=5&sort=forecast`;
    searchBar.value = '';

    fetch(requestUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid location');
            }
            return response.json();
        })
        .then(data => {
            weatherData = data;
            allWeatherData()
        })
        .catch(error => console.log(error));
}


function allWeatherData(){

    const name = weatherData.name
    const degrees = weatherData.main.temp
    const icon = weatherData.weather[0].icon
    const iconUrl1 = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
    
    const locationName = document.querySelector('.location')
    const locationDegrees = document.querySelector('.degrees')
    const weatherLocation = document.querySelector('.weatherIcon')
   
    locationName.textContent = `${name}`
    locationDegrees.textContent = `${degrees}`
    weatherLocation.innerHTML = `<img src="${iconUrl1}" alt="Weather Icon">`;
    
   
   
}
