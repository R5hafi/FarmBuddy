import React from 'react'
import { useState } from 'react'
import '../styles/GridView.css';
import Cell from './Cell'

function GridView() {
  const [rows, setRows] = useState(3);
  const [columns, setColumns] = useState(3);
  const x = 1;
  const grid = []
  for (let i = 0; i< rows; i++) {
    const row = [];
    for (let j=0; j< columns; j++) {
        row.push(<Cell key={`${i}-${j}`} row ={i} column={j}></Cell>);
    }
    grid.push((
    <div key={i} className="row">
        {row}
    </div>))
  }
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