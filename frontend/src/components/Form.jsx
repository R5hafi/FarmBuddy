import React from "react";
import '../styles/Form.css'

function Form() {
  return (
    <>
      <div id="form-container">
        <div className="form">
          <label>Ratio of Nitrogen content in soil <input type="text" /></label>
          <label>Ratio of Phosphorous content in soil <input type="text" /></label>
          <label>Ratio of Potassium content in soil <input type="text" /></label>
          <label>Temperature (&deg;C)<input type="text" /></label>
          <label>Humidity (%)<input type="text" /></label>
          <label>pH value of the soil <input type="text" /></label>
          <label>Rainfall (mm)<input type="text" /></label>
        </div>
      </div>
    </>
  )
}

export default Form;