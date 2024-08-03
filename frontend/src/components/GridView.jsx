import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/GridView.css';
import Cell from './Cell'
import { useContext } from 'react';
import { SelectedCellContext } from '../contexts/SelectedCellContext'

function GridView({count, setCount}) {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);  
  const [size, setSize] = useState(150);
  const { selectedCells, setSelectedCells } = useContext(SelectedCellContext);
  // helper function to get dimensions of screen.
  function getWindowDimensions() {
    const hasWindow = typeof window !== 'undefined';
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return [
      width,
      height,
    ];
  }
  // run everytime column or row changes.
  useEffect(() => {
    // dynamically scale size.
    let scaleFactor = Math.max(rows, columns);
    let screenSize = getWindowDimensions();
    setSize(0.6 * (screenSize[0] / scaleFactor / 2));
    // remove selected cells that lie outside boundaries.
    setSelectedCells(selectedCells.filter(cell => {
      const parts = cell.split("-");
      const row = parseInt(parts[0], 10);
      const col = parseInt(parts[1], 10);
      return (row < rows && col < columns);
    }));

  }, [rows, columns])
  
  const grid = []
  for (let i = 0; i< rows; i++) {
    const row = [];
    for (let j=0; j< columns; j++) {
        row.push(<Cell key={`${i}-${j}`} id={`${i}-${j}`} row ={i} column={j} size={size}></Cell>);
    }
    grid.push((
    <div key={i} className="row">
        {row}
    </div>))
  }

  useEffect(() => {
    const currentCount = rows * columns;
    if (currentCount !== count) {
      setCount(currentCount);
    }
  }, [rows, columns, count, setCount]);

  return (
    <div className="grid-view">
      <div id="dimension-container">
        <label>
          Rows:
          <input
            type="number"
            value={Math.max(1, Math.min(15, rows))}
            onChange={(e) => setRows(Math.max(1, Math.min(15, Number(e.target.value))))}
            min="1"
            max="15"
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={Math.max(1, Math.min(15, columns))}
            onChange={(e) => setColumns(Math.max(1, Math.min(15, Number(e.target.value))))}
            min="1"
            max="15"
          />
        </label>
      </div>
      <div className="grid">{grid}</div>
    </div>
  );
}

export default GridView