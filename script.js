const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const forecastContainer = document.querySelector('.forecast-container');
const toggleSwitch = document.getElementById('toggle-switch');
const backgroundImg = document.querySelector('.background-img img');
const key1 = config.WEATHER_KEY; 
const key2 = config.UNSPLASH_KEY;

backgroundImg.addEventListener('load', fadeImg);

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
            await getCityPhoto(searchBar.value);
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
        await getCityPhoto(searchBar.value);
        weatherInfo(dataArr);
    })();
});

const card = document.querySelector('.forecast-card');
// Flip card animation 
card.addEventListener( 'click', () => {
  card.classList.toggle('flip');
});

// Get data from API return data
async function getWeatherForecast(city) {
    if (city === undefined) {
        city = 'Seattle';
    }

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key1}`, {mode: 'cors'});
        const data = await response.json();
        data.header("Access-Control-Allow-Origin", "*");
        data.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=alerts,minutely&units=imperial&appid=${key1}`)
        const forecastData = await forecast.json();
        return [data, forecastData];
    } catch(err) {
        console.log(err);
    }

}

// Get random photo from Unsplash 
async function getCityPhoto(city) {
    if (city === undefined) {
        city = 'Seattle';
    }
    const img = document.querySelector('.background-img img');
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?query=${city}&orientation=landscape&count=1&client_id=${key2}`, {mode: 'cors'});
        const data = await response.json();
        img.src = data[0].urls.regular;
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
    currentInfo(dataArr[1]);
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
    const current = formatUnix(data.current.dt);
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

function currentInfo(data) {
    const sunrise = formatHour(data.current.sunrise);
    const sunset = formatHour(data.current.sunset);
    const dataArr = [
        sunrise,
        sunset,
        data.current.humidity + '%',
        `${data.current.pressure} hPa`,
        `${data.current.wind_speed} m/s`,
        data.current.wind_deg
    ];
    const infoArr = [...document.querySelectorAll('.info span')];
    for (let i = 0; i < infoArr.length; i++) {
        infoArr[i].textContent = dataArr[i];
    }
}

// Format to human-readable time 
function formatUnix(data) {
    const unixTimestamp = data;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const readableFormat = dateObject.toLocaleString();
    return readableFormat;
}

// Format unix to hours 
function formatHour(data) {
    const unixTimestamp = data;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const readableFormat = dateObject.toLocaleString('en-US', {hour: 'numeric'});
    return readableFormat;
}

// Fade animation for forecast container 
function forecastFade() {
    setTimeout(() => {
        forecastContainer.classList.add('show');
    }, 1000);
}

// Converts fahrenheit to celsius
function convertFahrenheit(num) {
    const celsius = ((num - 32) * 5/9);
    return celsius
}

function fadeImg() {
    this.style.transition = 'opacity 1s';
    this.style.opacity = '1';
}