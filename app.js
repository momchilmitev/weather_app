window.onload = async function () {
	const WEATHER_API_KEY = '9d91ab64e7fbfaa8d55e9780ac474230';
	const REVERSE_API_KEY = '61ac8f7f736d8a';
	const town = document.querySelector('.town');
	const image = document.querySelector('.current-icon');
	const temp = document.querySelector('.temperature');
	const press = document.querySelector('.extras__pressure--value');
	const humid = document.querySelector('.extras__humidity--value');
	const wind = document.querySelector('.extras__wind--value');

	async function getCoords() {
		const position = await new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		return {
			long: position.coords.longitude,
			lat: position.coords.latitude,
		};
	}

	const { long, lat } = await getCoords();

	const weatherUrl = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${long}`;
	const reverseUrl = `https://eu1.locationiq.com/v1/reverse.php?key=${REVERSE_API_KEY}&lat=${lat}&lon=${long}&format=json`;
	const {
		currently: { icon, temperature, humidity, pressure, windSpeed },
	} = await (await fetch(weatherUrl)).json();
	const cityRes = await (await fetch(reverseUrl)).json();

	town.textContent = cityRes.address.city;
	image.src = `icons/${icon}.png`;
	temp.innerHTML = `${temperature} &deg;F`;
	press.textContent = `${pressure} hpa`;
	humid.textContent = `${humidity} %`;
	wind.textContent = `${windSpeed} m/s`;
};
