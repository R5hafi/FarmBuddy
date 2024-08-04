import React, { useState, useContext } from 'react';
import '../styles/Form.css';
import { SelectedCellContext } from '../contexts/SelectedCellContext';
import axios from 'axios';

function Form() {
  // get context
  const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);

  // state for form inputs
  const [N, setN] = useState('');
  const [P, setP] = useState('');
  const [K, setK] = useState('');
  const [temperature, setTemperature] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pH, setPH] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [plant, setPlant] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/evaluate', {
        N, P, K, temperature, humidity, pH, rainfall, plant: plant.toLowerCase()
      });
      const successRate = response.data.success_rate;

      // Update selected cells with the success rate
      for (let i = 0; i < selectedCells.length; i++) {
        document.getElementById(selectedCells[i]).classList.toggle('highlight');
        document.getElementById(selectedCells[i]).innerHTML = `${successRate.toFixed(2)}%`;
      }

      setSelectedCells([]);
      // Clear all input values
      document.querySelectorAll(".form label>input").forEach((item) => {
        item.value = "";
      });
    } catch (error) {
      console.error('Error fetching success rate:', error);
    }
  };

  return (
    <>
      <div id="form-container">
        <div className="form">
          <label>Ratio of Nitrogen content in soil <input type="text" value={N} onChange={(e) => setN(e.target.value)} /></label>
          <label>Ratio of Phosphorous content in soil <input type="text" value={P} onChange={(e) => setP(e.target.value)} /></label>
          <label>Ratio of Potassium content in soil <input type="text" value={K} onChange={(e) => setK(e.target.value)} /></label>
          <label>Temperature (°C)<input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} /></label>
          <label>Humidity (%)<input type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)} /></label>
          <label>pH value of the soil <input type="text" value={pH} onChange={(e) => setPH(e.target.value)} /></label>
          <label>Rainfall (mm)<input type="text" value={rainfall} onChange={(e) => setRainfall(e.target.value)} /></label>
          <label>Plant <input id="plant-name" type="text" value={plant} onChange={(e) => setPlant(e.target.value)} /></label>
        </div>
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default Form;
