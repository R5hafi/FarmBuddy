import React from 'react';
import "../styles/Cell.css"

function Cell({ id, row, column, size }) {

    const cellStyle = {
        width: `${size}px`,
        height: `${size}px`
      };

  function handleClick() {
    document.getElementById(id).classList.toggle("highlight");
    //console.log(`clicked`);
    //console.log(document.getElementById(id));
  }

  return (
    <div id={id} className="cell" onClick={() => handleClick()} style={cellStyle}>
      Cell ({row}, {column})

    </div>
  );
}

export default Cell;