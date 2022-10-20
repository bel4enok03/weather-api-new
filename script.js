const api = {
	endpoint: 'https://api.openweathermap.org/data/2.5/',
	key: 'afd76750d795c3009ee7ceba5b16020a',
};

const input = document.querySelector('#input');
input.addEventListener('keydown', enter);

function enter(e) {
	if (e.keyCode === 13) {
		getInfo(input.value);
	}
}

async function getInfo(data) {
	const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}&lang={ru}`);
	const result = await res.json();
	displayResult(result);
}

function displayResult(result) {
	let city = document.querySelector('.city');
	city.textContent = `Weather in ${result.name}`;
	let nameOfCity = result.name;
	let url = 'url(https://source.unsplash.com/1600x900/?' + nameOfCity + ')';
	document.body.style.backgroundImage = url;

	getOurDate();

	let temperature = document.querySelector('.temp');
	temperature.innerHTML = `${Math.round(result.main.temp)}<span>°</span>`;

	let feelsLike = document.querySelector('.feelsLike');
	feelsLike.innerHTML = `Feels like: ${Math.round(result.main.feels_like)}<span>°</span>`;

	let conditions = document.querySelector('.conditions');
	conditions.textContent = `${result.weather[0].description}`;

	let wind = document.querySelector('.wind');
	wind.innerHTML = `Wind speed: ${result.wind.speed}<span> km/h</span>`;

	let locationIcon = document.querySelector('.weather-icon');
	let icon = result.weather[0].icon;
	locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png"></img>`;
}

function getOurDate() {
	const myDate = new Date();
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	let day = days[myDate.getDay()];

	let todaysDate = myDate.getDate();

	let month = months[myDate.getMonth()];

	let year = myDate.getFullYear();

	let showDate = document.querySelector('#date');
	showDate.textContent = `${day}` + ' ' + `${todaysDate}` + ' ' + `${month}` + ' ' + `${year}`;
}
