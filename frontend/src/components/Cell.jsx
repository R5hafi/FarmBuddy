import React from 'react';

function Cell({ row, column }) {
  return (
    <div className="cell">
      Cell ({row}, {column})
    </div>
  );
}

export default Cell;