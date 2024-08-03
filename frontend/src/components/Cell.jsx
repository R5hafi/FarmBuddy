import React from 'react';

function Cell({ row, column, size }) {
    const cellStyle = {
        width: `${size}px`,
        height: `${size}px`
      };

  return (
    <div className="cell" style={cellStyle}>
      Cell ({row}, {column} {size})

    </div>
  );
}

export default Cell;