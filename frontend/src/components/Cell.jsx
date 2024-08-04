import React from 'react';
import "../styles/Cell.css"
import { useContext, useState, useEffect } from 'react';
import { SelectedCellContext } from '../contexts/SelectedCellContext'
import ModalInfo from './ModalInfo';
import { CohereClient } from "cohere-ai";

function Cell({ id, row, column, size, modalText }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasData, setHasData] = useState(false);

    
    const cellStyle = {
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2.5}px`//change later for percentage display
      };

  const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);
  
  
  function handleClick() {
    document.getElementById(id).classList.toggle('highlight');
    
    if ((document.getElementById(id).innerText).includes('%')) {
      setHasData(true);
      console.log(hasData);
    }
    setSelectedCells((prevSelectedCells) => {
      if (prevSelectedCells.includes(id)) {
        return prevSelectedCells.filter((cellId) => cellId !== id);
      } else {
        return [...prevSelectedCells, id];
      }
    });
    setIsModalOpen(true);
  }
  if (hasData) {
  return (
    <>
      <div id={id} className="cell" onClick={() => handleClick()} style={cellStyle}>
        Cell ({row}, {column})
      </div>
      <ModalInfo 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)}
        title="Plot Information"
        content={modalText}
      />

    </>
  );
  } else {
    return <div id={id} className="cell" onClick={() => handleClick()} style={cellStyle}>
        Cell ({row}, {column})
      </div>
  }
}

export default Cell;