import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [needWeatherData, setNeedWeatherData] = useState(true);
  const [weather, setWeather] = useState(
    {
      "weather": [
        {
          "icon": "04d"
        }
      ],
      "main": {
        "temp": 301.73,
      },
      "wind": {
        "speed": 1.54,
      }
    }
  );

  useEffect(() => {
    console.log("fetching country data...");
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("country data obtained!");
      setCountries(response.data);
    });
  }, []);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
    setNeedWeatherData(true)
  };

  const countryButtonHandler = (event) => {
    const country = event.target.value;
    console.log(country);
    setNameFilter(event.target.value);
  };

  const countriesToShow =
    nameFilter.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
        );

  if (countriesToShow.length === 1) {
    const matchedCountry = countriesToShow[0];
    if (needWeatherData) {
      setNeedWeatherData(false)
      console.log("fetching weather data...");
      axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${matchedCountry.capital}&APPID=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        console.log("weather data obtained!");
        setWeather(response.data);
      });
    }
    
    return (
      <div>
        <p>
          find countries <input onChange={handleNameFilterChange} />
        </p>
        <h1>{matchedCountry.name.common}</h1>
        <p>capital {matchedCountry.capital}</p>
        <p>area {matchedCountry.area}</p>
        <h2>langauges</h2>
        <ul>
          {Object.values(matchedCountry.languages).map((langauge, i) => (
            <li key={i}>{langauge}</li>
          ))}
        </ul>
        <p>{matchedCountry.flag}</p>
        <h2>Weather in {matchedCountry.capital}</h2>
        <p>temperature {Math.round(weather.main.temp - 273, 4)} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather-icon" />
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    );
  } else if (countriesToShow.length < 10) {
    return (
      <div>
        <p>
          find countries <input onChange={handleNameFilterChange} />
        </p>
        {countriesToShow.map((country, i) => (
          <p key={i}>
            {country.name.common}{" "}
            <button value={country.name.common} onClick={countryButtonHandler}>
              show
            </button>
          </p>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>
          find countries <input onChange={handleNameFilterChange} />
        </p>
        <p>Too many matches {countriesToShow.length}, specify another filter</p>
      </div>
    );
  }
};

export default App;
