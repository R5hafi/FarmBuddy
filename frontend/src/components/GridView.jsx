import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/GridView.css';
import Cell from './Cell'

function GridView({count, setCount}) {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);  
  const [size, setSize] = useState(150);
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
    setSize(0.5 * (screenSize[0] / scaleFactor / 2));

  }, [rows, columns])
  const x = 1;
  const grid = []
  for (let i = 0; i< rows; i++) {
    const row = [];
    for (let j=0; j< columns; j++) {
        row.push(<Cell key={`${i}-${j}`} id={`${i}-${j}`} row ={i} column={j}></Cell>);
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
      <div>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={(e) => setRows(Number(e.target.value))}
            min="1"
            max="15"
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={columns}
            onChange={(e) => setColumns(Number(e.target.value))}
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