import React from "react";
import '../styles/Form.css'
import { useContext } from 'react';
import { SelectedCellContext } from '../contexts/SelectedCellContext'

function Form() {
  function onSumbit() {
      // get context
      const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);
      // toggle off all of the selected cells.
      for (let i = 0; i < selectedCells.length; i++) {
        document.getElementById(selectedCells[i]).classList.toggle('highlight');
      }
      setSelectedCells([]);
  }

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
        <button type="submit">Submit</button>
      </div>
    </>
  )
}

export default Form;