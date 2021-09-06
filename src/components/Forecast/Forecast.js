import React, { useState } from "react";
import Conditions from "../Conditions/Conditions";
import classes from "./Forecast.module.css";

const Forecast = () => {
  /* Put the city and unit values in state so they can be added to the URL query string (line 31) on submit */

  const [city, setCity] = useState("");
  const [unit, setUnit] = useState("imperial");

  /* Create the resonseObj variable and the function to change it using useState, with starting value set to an empty object surrounded by curly braces */

  const [responseObj, setResponseObj] = useState({});

  /* Put the error and loading variables in state with default values set to false so that if no characters are input, no request is made */

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  /* Prevent page refreshing with loss of state and information on button click (with 'e' for event). The getForecast function will instead be called from the onSubmit listener in the form element (line 69) */

  function getForecast(e) {
    e.preventDefault();

    /* Check if no characters are entered. If so trigger the error message (line 10 of the Conditions component) and do not make an empty request */

    if (city.length === 0) {
      return setError(true);
    }

    // Clear state in preparation for new data

    setError(false);
    setResponseObj({});

    setLoading(true);

    // Encode the city input URI before putting it into the URL string //

    const uriEncodedCity = encodeURIComponent(city);

    /* Retrieves weather data from OpenWeatherAPI. Backticks around the URL string allow for variables to be dynamically added (inside curly braces, with a leading $ sign) */

    console.log(process.env);

    fetch(
      `https://community-open-weather-map.p.rapidapi.com/weather?units=${unit}&q=${uriEncodedCity}`,
      {
        /* Env variable stored in the .env file to prevent hackers discovering the API key */

        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        },
      }
    )
      /* Modify the getForecast function to convert the response into a JSON object and assign the response value to the responseObj variable in state */

      .then((response) => response.json())

      /* Throws the eror in the catch block if HTTP response is not 200 */

      .then((response) => {
        if (response.cod !== 200) {
          throw new Error();
        }

        setResponseObj(response);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.log(err.message);
      });
  }

  /* Location for displaying data, with input form. Each input is assigned a corresponding value from state, updated using the onChange event listener, with each change stored and passed with the 'e' event argument */

  return (
    <div>
      <h2>Find current weather conditions</h2>
      <form onSubmit={getForecast}>
        <input
          type="text"
          placeholder="Enter City"
          maxLength="50"
          className={classes.textInput}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "imperial"}
            value="imperial"
            onChange={(e) => setUnit(e.target.value)}
          />
          Fahrenheit
        </label>
        <label className={classes.Radio}>
          <input
            type="radio"
            name="units"
            checked={unit === "metric"}
            value="metric"
            onChange={(e) => setUnit(e.target.value)}
          />
          Celsius
        </label>

        {/* Button calls getForecast function on click */}

        <button className={classes.Button} type="submit">
          Get forecast
        </button>
      </form>

      {/* Access the data from responseObj, error and loading that are inside the props objects */}

      <Conditions
        responseObj={responseObj}
        error={error} // new
        loading={loading} // new
      />
    </div>
  );
};
export default Forecast;
