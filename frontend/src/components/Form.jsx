import React from "react";
import '../styles/Form.css'
import { useContext, useEffect } from 'react';
import { SelectedCellContext } from '../contexts/SelectedCellContext'

function Form() {
  // get context
  const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);
  

  
  async function onSubmit() {

      let currentData = 0;
      let percent = 0;
      // get data from backend. 
      await fetch('http://127.0.0.1:5000/data')
      .then((response) => response.json())
      .then((data) => {
        currentData = data;
        // modify selected cells.
        percent = currentData.percentage;
        console.log(currentData.Percentage);
        
      }, [])
      // toggle off all of the selected cells.
      for (let i = 0; i < selectedCells.length; i++) {
        document.getElementById(selectedCells[i]).classList.toggle('highlight');

        document.getElementById(selectedCells[i]).innerText = `${currentData.Percentage}%`;
      }
      setSelectedCells([]);
      //clear all input values
      document.querySelectorAll(".form label>input").forEach((item) => {
        item.value = "";
      })
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
          <label>Plant <input type="text" /></label>
        </div>
        <button type="submit" onClick={() => {
          onSubmit();
        }}>Submit</button>
      </div>
    </>
  )
}

export default Form