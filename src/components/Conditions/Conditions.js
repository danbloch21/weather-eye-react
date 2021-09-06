// Functional component that receives the responseObj from the Forecast component via props

import React from "react";
import { Wrapper, Small, Loader } from "./Conditions.module.css";

const conditions = (props) => {
  return (
    <div className={Wrapper}>
      {/* Ternary expressions that turn on or off depending on the props that are passed */}

      {props.error && (
        <small className={Small}>Please enter a valid city</small>
      )}

      {props.loading && <div className={Loader} />}

      {/* Ternary JavaScript operator displays the data only when the HTTP response code is 200 (meaning successful request) */}

      {props.responseObj.cod === 200 ? (
        <div>
          <p>
            <strong>{props.responseObj.name}</strong>
          </p>
          <p>
            It is currently {Math.round(props.responseObj.main.temp)} degrees
            out with {props.responseObj.weather[0].description}
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default conditions;
