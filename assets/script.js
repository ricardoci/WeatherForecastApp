const apiKey = "bec6baa443da28a01e0f2cd9b39dc903";
const searchBar = document.querySelector('#search-bar');
const searchButton = document.querySelector('#search-button');
const one = document.querySelector('.one');
const two = document.querySelector('.two');
const three = document.querySelector('.three');
const four = document.querySelector('.four');
const history = document.querySelector('#history');
const historyCard = document.querySelector('.historyCard');
const exit = document.querySelector('#exit');


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
    const requestUrl3 = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=imperial`
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
           
            storageData()
        }).catch(error => console.log(error));


        fetch(requestUrl3)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid location');
            }
            return response.json();
        })
        .then(data => {
            
            forecastData = data
            localStorage.setItem(query, query)

            daysData()
            
        }).catch(error => console.log(error));
        
}


let storageData = function allWeatherData(){

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
let daysData = function allforecastData(){
    
    const date = new Date(forecastData.list[5].dt_txt);
    const datesecond = new Date(forecastData.list[13].dt_txt);
    const datethird = new Date(forecastData.list[21].dt_txt);
    const datefourth = new Date(forecastData.list[29].dt_txt);

    const dayName = date.toLocaleDateString('default', {weekday: 'short'});
    const dayNameSecond = datesecond.toLocaleDateString('default', {weekday: 'short'});
    const dayNameThird = datethird.toLocaleDateString('default', {weekday: 'short'});
    const dayNameFourth = datefourth.toLocaleDateString('default', {weekday: 'short'});

    const icons = forecastData.list[5].weather[0].icon
    const icons1 = forecastData.list[13].weather[0].icon
    const icons2 = forecastData.list[21].weather[0].icon
    const icons3 = forecastData.list[29].weather[0].icon
    // weather conditions description

    const firstDesc = forecastData.list[5].weather[0].description
    const secondDesc = forecastData.list[13].weather[0].description
    const thirdDesc = forecastData.list[21].weather[0].description
    const fourthDesc = forecastData.list[29].weather[0].description
    



    const iconUrl2 = `http://openweathermap.org/img/wn/${icons}@2x.png`;
    const iconUrl3 = `http://openweathermap.org/img/wn/${icons1}@2x.png`;
    const iconUrl4 = `http://openweathermap.org/img/wn/${icons2}@2x.png`;
    const iconUrl5 = `http://openweathermap.org/img/wn/${icons3}@2x.png`;

    firstShortendDate = document.querySelector('.firstDay')
    secondShortendDate = document.querySelector('.secondDay')
    thirdShortendDate = document.querySelector('.thirdDay')
    fourthShortendDate = document.querySelector('.fourthDay')

    const firstDes = document.querySelector('.firstDescript')
    const secondDes = document.querySelector('.secondDescript')
    const thirdDes = document.querySelector('.thirdDescript')
    const fourthDes = document.querySelector('.fourthDescript')




    one.innerHTML = `<img src="${iconUrl2}" alt="Weather Icon">`;
    two.innerHTML = `<img src="${iconUrl3}" alt="Weather Icon">`;
    three.innerHTML = `<img src="${iconUrl4}" alt="Weather Icon">`;
    four.innerHTML = `<img src="${iconUrl5}" alt="Weather Icon">`;

    firstShortendDate.textContent = `${dayName}`
    secondShortendDate.textContent = `${dayNameSecond}`
    thirdShortendDate.textContent = `${dayNameThird}`
    fourthShortendDate.textContent = `${dayNameFourth}`

    firstDes.textContent = `${firstDesc}`
    secondDes.textContent = `${secondDesc}`
    thirdDes.textContent = `${thirdDesc}`
    fourthDes.textContent = `${fourthDesc}`
}

// function addedHistory{


// }

history.addEventListener('click', function(){
    historyCard.style.display = "block";
    exit.style.display = "block";

   


})

function retrievingHis() {
    
    let list = '';
    let count = 0;
    for (let i = 0; i < localStorage.length; i++) {
      if (count >= 3) break;
      
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      globalKey = key;
      globalValue = value;
    
      list += `<form>  <input type="text"  
      <input type="read only" id="searchHistory" onclick="hello('${value}')"  value="${value}" readonly>  </form> 
      <button id="${key}" class="remove" onClick="historyCard">remove</button>`;
      
      count++;
      
    }
    historyCard.innerHTML = list;
  }


  
history.addEventListener('click', function(){
    historyCard.style.display = "block";
    exit.style.display = "block";

    


})

exit.addEventListener('click', function(){

    
    historyCard.style.display = "none";
    
    exit.style.display = "none";
      
  


});

historyCard.addEventListener("click", function(e) {
      
    if(e.target.tagName === 'BUTTON') {
      localStorage.removeItem(e.target.id);
    
      e.target.previousElementSibling.remove();
      e.target.remove();
     

    }
    
     
  });

  function hello(value) {
    searchBar.value = value;
    let form = searchButton.form;
    historyCard.style.display = "none";
    exit.style.display = "none";
    searchButton.click();
    
}


  
   
