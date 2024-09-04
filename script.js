const API_Key = 'bd83d48608e0a992403a12a685ff4986';

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-button');
const city = document.getElementById('city');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const icon = document.getElementById('icon');

window.addEventListener('load', () => {
    const lastSearchedCity = localStorage.getItem('lastSearchedCity')||'Tunisia';
		getWeather(lastSearchedCity).then((weather) => {
				if (weather) {
						showWeather(weather);
				}
		});
});

searchButton.addEventListener('click', (event) => {
    event.preventDefault();
    const cityName = searchBar.value;
    getWeather(cityName).then((weather) => {
        if (weather) {
            showWeather(weather);
            localStorage.setItem('lastSearchedCity', cityName);
        }
    });
});

searchBar.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') {
				event.preventDefault();
				const cityName = searchBar.value;
				getWeather(cityName).then((weather) => {
						if (weather) {
								showWeather(weather);
								localStorage.setItem('lastSearchedCity', cityName);
						}
				});
		}
});

async function getWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function showWeather(data) {
    try {
        city.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp - 273.15) + '°C';
				description.innerText = 'Humidity: ' + data.main.humidity + '%';
        humidity.innerText =data.weather[0].description;
        icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    } catch (error) {
        console.log(error);
    }
}
