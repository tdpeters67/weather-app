let searchedCity = {
  name: "",
  metric: false,
};

async function fetchWeather(city) {
  const response = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ba6cb5364e724d34ab6154722232706&q=" ${city}`,
    { mode: "cors" }
  );
  let weatherData = await response.json();
  let newData = processData(weatherData);

  if (searchedCity.metric == false) {
    displayAmericanData(newData);
  } else {
    displayMetricData(newData);
  }
}

function processData(weatherData) {
  let newData = {
    condition: weatherData.current.condition.text,
    icon: weatherData.current.condition.icon,
    iconCode: weatherData.current.condition.code,
    currentTemp: {
      f: weatherData.current.temp_f,
      c: weatherData.current.temp_c,
    },
    humidity: weatherData.current.humidity,
    wind: {
      mph: {
        speed: weatherData.current.wind_mph,
        direction: weatherData.current.wind_dir,
      },
      kph: {
        speed: weatherData.current.wind_kph,
        direction: weatherData.current.wind_dir,
      },
    },
    city: weatherData.location.name,
  };
  return newData;
}

function displayAmericanData(newData) {
  document.querySelector(".city").innerText = "Weather in " + newData.city;
  document.querySelector(".temp").innerText = newData.currentTemp.f + "°F";
  document.querySelector(".icon").src = newData.icon;
  document.body.style.backgroundImage = `url(${newData.icon})`;
  document.querySelector(".description").innerText = newData.condition;
  document.querySelector(".humidity").innerText =
    "Humidity: " + newData.humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind: " + newData.wind.mph.speed + "mph " + newData.wind.mph.direction;

  document.querySelector(".weather").classList.remove("loading");
}

function displayMetricData(newData) {
  document.querySelector(".city").innerText = "Weather in " + newData.city;
  document.querySelector(".temp").innerText = newData.currentTemp.c + "°C";
  document.querySelector(".icon").src = newData.icon;
  document.body.style.backgroundImage = `url(${newData.icon})`;
  document.querySelector(".description").innerText = newData.condition;
  document.querySelector(".humidity").innerText =
    "Humidity: " + newData.humidity + "%";
  document.querySelector(".wind").innerText =
    "Wind: " + newData.wind.kph.speed + "kph " + newData.wind.kph.direction;

  document.querySelector(".weather").classList.remove("loading");
}

document.querySelector(".search button").addEventListener("click", function () {
  searchedCity.name = document.querySelector(".search-bar").value;
  document.querySelector(".search-bar").value = "";
  fetchWeather(searchedCity.name);
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      searchedCity.name = document.querySelector(".search-bar").value;
      document.querySelector(".search-bar").value = "";
      fetchWeather(searchedCity.name);
    }
  });

document.querySelector(".change-button").addEventListener("click", function () {
  if (searchedCity.metric == false) {
    searchedCity.metric = true;
    fetchWeather(searchedCity.name);
  } else if (searchedCity.metric == true) {
    searchedCity.metric = false;
    fetchWeather(searchedCity.name);
  }
  console.log(searchedCity);
});

// fetchWeather("Richmond");
