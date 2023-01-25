const apiKey = "bec6baa443da28a01e0f2cd9b39dc903";
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');

let weatherData;
let forecastData;

searchButton.addEventListener('click', getWeather);

function getWeather(event) {
    event.preventDefault();

    let query = searchBar.value.toLowerCase();

    if (!query) {
        return console.log('Please type a location');
    }

    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=imperial&limit=5&sort=forecast`;
    const requestUrl3 = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}`
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
        }).catch(error => console.log(error));


        fetch(requestUrl3)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid location');
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            forecastData = data

            allforecastData()
            
        }).catch(error => console.log(error));
        
}


function allWeatherData(){

    const name = weatherData.name
    const degrees = Math.floor(weatherData.main.temp);
    const icon = weatherData.weather[0].icon
    const iconDescript = weatherData.weather[0].description
    const iconUrl1 = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
    
    const locationName = document.querySelector('.location')
    const locationDegrees = document.querySelector('.degrees')
    const weatherLocation = document.querySelector('.weatherIcon')
    const iconDescription = document.querySelector('.IconDescription')
    
   
    locationName.textContent = `${name}`
    locationDegrees.textContent = `${degrees + '°'} `
    weatherLocation.innerHTML = `<img src="${iconUrl1}" alt="Weather Icon">`;
    iconDescription.textContent = `${iconDescript}`
    
   
   
}
function allforecastData(){
    const icons = forecastData.list[0].weather[0].icon
    const icons1 = forecastData.list[1].weather[0].icon
    const icons2 = forecastData.list[2].weather[0].icon
    const icons3 = forecastData.list[3].weather[0].icon
    



    const iconUrl2 = `http://openweathermap.org/img/wn/${icons}@2x.png`;
    const iconUrl3 = `http://openweathermap.org/img/wn/${icons1}@2x.png`;
    const iconUrl4 = `http://openweathermap.org/img/wn/${icons2}@2x.png`;
    const iconUrl5 = `http://openweathermap.org/img/wn/${icons3}@2x.png`;




    one.innerHTML = `<img src="${iconUrl2}" alt="Weather Icon">`;
    two.innerHTML = `<img src="${iconUrl3}" alt="Weather Icon">`;
    three.innerHTML = `<img src="${iconUrl4}" alt="Weather Icon">`;
    four.innerHTML = `<img src="${iconUrl5}" alt="Weather Icon">`;
}
