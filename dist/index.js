const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const forecastContainer = document.getElementById('forecast-container');
const toggleSwitch = document.getElementById('toggle-switch');
const key = config.MY_API_KEY; 

// Toggle fahrenheit to celsius
toggleSwitch.addEventListener('click', (e) => {
    if (e.target.checked === false) {
        (async () => {
            const dataArr = await getWeatherForecast(searchBar.value);
            currentTemp(dataArr[1].current.temp, '&#8457');
        })();
    } else if (e.target.checked === true) {
        (async () => {
            const dataArr = await getWeatherForecast(searchBar.value);
            let degrees = dataArr[1].current.temp;
            degrees = convertFahrenheit(degrees);
            currentTemp(degrees, '&#8451');
        })();
    }
});

// Enter key is pressed 
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const searchContainer = document.getElementById('search-bar-container');
        searchContainer.classList.add('move');
        const searchHeading = document.getElementById('search-heading');
        searchHeading.classList.add('fade');
        forecastFade();
        (async () => {
            const dataArr = await getWeatherForecast(searchBar.value);
            weatherInfo(dataArr);
        })();
    }
});

// When button is clicked 
searchBtn.addEventListener('click', () => {
    const searchContainer = document.getElementById('search-bar-container');
    searchContainer.classList.add('move');
    const searchHeading = document.getElementById('search-heading');
    searchHeading.classList.add('fade');
    forecastFade();
    (async () => {
        const dataArr = await getWeatherForecast(searchBar.value);
        console.log(dataArr);
        weatherInfo(dataArr);
    })();
});

// When forecast container is clicked 
forecastContainer.addEventListener('click', (e) => {
    console.log(e.target.parentElement);
}); 

// Get data from API return data
async function getWeatherForecast(city) {
    if (city === undefined) {
        city = 'Seattle';
    }

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`, {mode: 'cors'});
        const data = await response.json();
        const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=alerts,minutely&units=imperial&appid=${key}`)
        const forecastData = await forecast.json();
        return [data, forecastData];
    } catch(err) {
        console.log(err);
    }

}

// Adds data to forecast container 
function weatherInfo(dataArr) {
    currentTime(dataArr[1]);
    currentTemp(dataArr[1].current.temp, '&#8457');
    currentDesc(dataArr[1].current.weather[0].description);
    createIcon(dataArr[1].current.weather[0].icon); 
    currentLocation(dataArr[0].name, dataArr[0].sys.country);
}

function currentTemp(data, unit) {
    data = Math.round(data); 
    const temp = document.getElementById('temp');
    temp.innerHTML = data + `<span>${unit}</span>`; 
}

function currentDesc(data) {
    const desc = document.getElementById('desc');
    desc.textContent = data; 
}

function createIcon(data) {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.className = `owi owi-${data}`;
}

// Set span to current time 
function currentTime(data) {
    const current = formatUnix(data);
    const div = document.getElementById('current');
    div.className = 'current move';
    const span = document.querySelector('#current span');
    span.textContent = current;
}

// Set heading to current location 
function currentLocation(city, country) {
    const location = document.getElementById('location');
    location.textContent = `${city}, ${country}`;
}

// Format to human-readable time 
function formatUnix(data) {
    const unixTimestamp = data.current.dt;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const readableFormat = dateObject.toLocaleString();
    return readableFormat;
}

// Fade animation for forecast container 
function forecastFade() {
    setTimeout(() => {
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.classList.add('show');
    }, 500);
}

// Converts fahrenheit to celsius
function convertFahrenheit(num) {
    const celsius = ((num - 32) * 5/9);
    return celsius
}