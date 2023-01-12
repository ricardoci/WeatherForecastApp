var apiKey = "bec6baa443da28a01e0f2cd9b39dc903";

function getApi(){
    var requestUrl = ' https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={apiKey}';

    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
}
