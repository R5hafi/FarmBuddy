import React from 'react';
import "../styles/Cell.css"
import { useContext, useState } from 'react';
import { SelectedCellContext } from '../contexts/SelectedCellContext'
import ModalInfo from './ModalInfo';
function Cell({ id, row, column, size }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [hasData, setHasData] = useState(false);
    const cellStyle = {
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size / 2.5}px`//change later for percentage display
      };
  
  const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);
  console.log(selectedCells);
  
  function handleClick() {
    document.getElementById(id).classList.toggle('highlight');
    
    if ((document.getElementById(id).innerText).includes('%')) {
      setHasData(true);
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
        title="Cell Information"
        content={`This is cell (${row}, ${column}).`}
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