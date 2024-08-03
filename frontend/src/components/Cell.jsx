import React from 'react';
import "../styles/Cell.css"
import { useContext } from 'react';
import { SelectedCellContext } from '../contexts/SelectedCellContext'

function Cell({ id, row, column, size }) {

    const cellStyle = {
        width: `${size}px`,
        height: `${size}px`
      };
  
  const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);
  console.log(selectedCells);
  
  function handleClick() {
    document.getElementById(id).classList.toggle('highlight');
    
    setSelectedCells((prevSelectedCells) => {
      if (prevSelectedCells.includes(id)) {
        return prevSelectedCells.filter((cellId) => cellId !== id);
      } else {
        return [...prevSelectedCells, id];
      }
    });
  }

  return (
    <div id={id} className="cell" onClick={() => handleClick()} style={cellStyle}>
      Cell ({row}, {column})

    </div>
  );
}

export default Cell;