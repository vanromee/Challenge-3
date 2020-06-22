// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidmFucm9tZWUiLCJhIjoiY2tiN3Rnc2U2MDh6dDJxdXNlaWt2Y3RrbyJ9.n5o9b02cf8Mkbu6ZU0xNUA';


//MAP
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [4.322840, 52.067101],
	zoom: 15,

});

map.addControl(new mapboxgl.NavigationControl());

map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl : mapboxgl
	}),
	'bottom-right');


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

	var icon = 'http://openweathermap.org/img/w/' + response.weather[0].icon+'.png';
	var description = response.weather[0].description;
	var city = response.name;
	var temp = response.main.temp;
	// var feelsLike = response.main.feels_like;
	// var tempMax = response.main.temp_max;
	// var tempMin = response.main.temp_min;
	// var humidity = response.main.humidity;
	// var pressure = response.main.pressure;

	// document.getElementById('weather').innerHTML = city + '<br>' + '<img src="http://openweathermap.org/img/w/'+response.weather[0].icon+'.png">' + '<br>' + description + '<br> <br>' + fromKtoC(temp) +'ºC';
	document.getElementById('city').innerHTML = city;
//	document.getElementById('icon').innerHTML = '<img src="http://openweathermap.org/img/w/'+response.weather[0].icon+'.png">';
	document.getElementById("iconWorking").src = "http://openweathermap.org/img/w/"+response.weather[0].icon+".png";
	document.getElementById('description').innerHTML = description;
	document.getElementById('temp').innerHTML = fromKtoC(temp) +'ºC';
}

getAPIdata();


//MOVIES - example 4 multiple icons

// var movies = [
// 	{
// 		name: ' ',
// 		location: {lat: , lng: },
// 	},


// ]


// var movies = {
// 	"url" : "https://api-gate2.movieglu.com/filmsNowShowing/?n=10",
// 	"method" : "GET",
// 	"timeout" : 0,
// 	"headers" : {
// 		"client" : "EDUC_7",
// 		"x-api-key" : "Kw14rAw1Lm2Ehya3BTHA6865Y4ULuwGmaOcOt6zI",
// 		"authorization" : "Basic RURVQ183X1hYOnd6NlBVRXZPWktYTQ==",
// 		"territory" : "ES",
// 		"api-version" : "v200",
// 		"geolocation" : "-22.0;14.0 (Recommended location)",
// 		"device-datetime" : "2018-09-14T08:30:17.360Z",
// 	},
// };

// .then(function (response) {
// 	console.log(response);
// });


var buttonElement = document.getElementById('search');
var inputElement = document.getElementById('inputValue');


buttonElement.onclick = function(event) {
	event.preventDefault();
	var value = inputElement.value;
	console.log('value: ', value);

}
