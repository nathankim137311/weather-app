const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const img = document.querySelector('#img-container img');

// Enter key is pressed 
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const searchContainer = document.getElementById('search-bar-container');
        searchContainer.classList.add('move');
        const searchHeading = document.getElementById('search-heading');
        searchHeading.classList.add('fade');
        (async () => {
            const data = await getWeatherForecast(searchBar.value);
            currentTime(data);
            console.log(data);
        })();
    }
});

// When button is clicked 
searchBtn.addEventListener('click', () => {
    const searchContainer = document.getElementById('search-bar-container');
    searchContainer.classList.add('move');
    const searchHeading = document.getElementById('search-heading');
    searchHeading.classList.add('fade');
    (async () => {
        const data = await getWeatherForecast(searchBar.value);
        currentTime(data);
        console.log(data);
    })();
});

// Get data from API return data
async function getWeatherForecast(city) {
    if (city === undefined) {
        city = 'Seattle';
    }

    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=23b924a71aa703b14e02ba5f0fa76477`, {mode: 'cors'});
        const data = await response.json();
        const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=alerts,minutely&units=imperial&appid=23b924a71aa703b14e02ba5f0fa76477`)
        const forecastData = await forecast.json();
        return forecastData;
    } catch(err) {
        console.log(err);
    }

}

function currentTime(data) {
    const current = formatUnix(data);
    const div = document.getElementById('current');
    div.className = 'current move';
    const span = document.querySelector('#current span');
    span.textContent = current;
}

function formatUnix(data) {
    const unixTimestamp = data.current.dt;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    const readableFormat = dateObject.toLocaleString();
    return readableFormat;
}