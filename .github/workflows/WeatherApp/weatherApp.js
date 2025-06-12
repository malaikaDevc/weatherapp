const apiKey = "f4a86bc8e20cf0f0c7b7f310fb9374c7";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.searchBtn');
const weatherIcon = document.querySelector('.weatherIcon');
const weatherContainer = document.querySelector('.container');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status === 404) {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.all').style.display = "none";
        weatherContainer.style.backgroundImage = "url('images/elegant design.jpeg')";

    } else {
        var data = await response.json();
        document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

        // Update weather icon and background based on conditions
        updateWeatherAppearance(data.weather[0].main);
        
        document.querySelector('.all').style.display = "block";
        document.querySelector('.error').style.display = "none";
    }
}

function updateWeatherAppearance(condition) {
    if (condition === "Clouds") {
        weatherIcon.src = "images/sun.png";
     
    } else if (condition === "Clear") {
        weatherIcon.src = "images/sunny.png";
    } else if (condition === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "Drizzle") {
        weatherIcon.src = "images/rain.png";
    } else if (condition === "Mist") {
        weatherIcon.src = "images/foggy.png";
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

// Current location function
function weather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.all').style.display = "none";
    }

    function success(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const FinalEndPoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        
        fetch(FinalEndPoint)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector('.city').innerHTML = data.name;
                document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
                document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';
                
                updateWeatherAppearance(data.weather[0].main);
                
                document.querySelector('.all').style.display = "block";
                document.querySelector('.error').style.display = "none";
            })
            .catch(err => {
                console.error('Error fetching location weather:', err);
                document.querySelector('.error').style.display = "block";
                document.querySelector('.all').style.display = "none";
            });
    }

    function error() {
        document.querySelector('.error').style.display = "block";
        document.querySelector('.all').style.display = "none";
    }
}

weather();
