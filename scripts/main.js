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

//api.openweathermap.org/data/2.5/weather?id={city id}&appid={your api key}

//WEATHER API

function getAPIdata() {

	var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
	var openWeatherMapApiKey ='f85bc440fac6d0317cee7070d886a3a9';
	var city = 'den haag';

	// construct request
	var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapApiKey + '&' + 'q=' + city; //form your request
	
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


//SERIES

var API_KEY = 'b0a0650097dd56358d4b5eb8879a89b2';
var IMAGE_URL = 'https://image.tmdb.org/t/p/w185';

var URL = 'https://api.themoviedb.org/3/search/tv?api_key=b0a0650097dd56358d4b5eb8879a89b2';

// function posterSuccess(results) {
// 	console.log(results);

// 	var poster = results.poster_path;
// 	var id = results.id;
// }


var buttonElement = document.getElementById('search');
var inputElement = document.getElementById('inputValue');
var seriesSearchable = document.getElementById('series-searchable');

function showSection(series) {
	return series.map((tv) => {
		if (tv.poster_path) {
			return `<img src=${IMAGE_URL + tv.poster_path} 
			data-tv-id=${tv.id}
			/>`;
		}
	})
}

//marking poster on map
// var posterMarker = document.createElement('div');

// // posterMarker.style.backgroundImage = ('url("https://image.tmdb.org/t/p/w185"' + tv.poster_path);
// posterMarker.style.backgroundImage = ('<img src="https://image.tmdb.org/t/p/w185"' + tv.poster_path + 'data-tv-id' + tv.id + '/>');
// posterMarker.style.width = '90px';
// posterMarker.style.height = '100px';

// var marker = new mapboxgl.Marker(posterMarker).setLngLat([4.322840, 52.067101]).addTo(map);



//create poster container
function createShowContainer(series) {
	var showElement = document.createElement('div');
	showElement.setAttribute('class', 'show');

	var showTemplate = `
		<section class="section">
			${showSection(series)}
		</section>
		<div class="content">
			<p-2 id="content-close"></p-2>
		</div>
	`;

	showElement.innerHTML = showTemplate;
	return showElement;
}

function renderSearchSeries(data){
	//data.results []
		seriesSearchable.innerHTML = '';
			var series = data.results;
			var showBlock = createShowContainer(series);
			seriesSearchable.appendChild(showBlock);
			console.log('Data: ', data);
}

buttonElement.onclick = function(event) {
	event.preventDefault();
	var value = inputElement.value;

	var newUrl = URL + '&query=' + value;


	fetch(newUrl)
		.then((response) => response.json())
		.then(renderSearchSeries) 
		.catch((error) => {
			console.log('Error: ', error);
		});

	inputElement.value = '';
	console.log('value: ', value);

}

