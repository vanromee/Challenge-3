
//WEATHER API
function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='f85bc440fac6d0317cee7070d886a3a9';
	var city = 'den haag';

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city; //form your request
	
	// get current weather
	fetch(request)
	
	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	
	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISuccess(response);	
		console.log(response);
	});
}


function fromKtoC(kelvin){
	var celsius = kelvin - 273.15;
	return celsius.toFixed(1);
}


function onAPISuccess(response) {
	console.log(response.main);

	var iconUrl = 'http://openweathermap.org/img/w/' + response.weather[0].icon+'.png';
	var city = response.name;
	var temp = response.main.temp;
	var feelsLike = response.main.feels_like;
	var tempMax = response.main.temp_max;
	var tempMin = response.main.temp_min;
	var humidity = response.main.humidity;
	var pressure = response.main.pressure;

	document.getElementById('weather').innerHTML = city + '<br>' + '<img src="http://openweathermap.org/img/w/'+response.weather[0].icon+'.png">' + '<br>' + response.weather[0].description + '<br> <br>' + fromKtoC(temp) +'ºC';
}

getAPIdata();


