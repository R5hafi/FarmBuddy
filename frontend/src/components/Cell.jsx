import React from 'react';
import "../styles/Cell.css"

function Cell({ id, row, column, size }) {

  function handleClick() {
    document.getElementById(id).classList.toggle("highlight");
    //console.log(`clicked`);
    //console.log(document.getElementById(id));
  }

  return (
    <div id={id} className="cell" onClick={() => handleClick()}>
      Cell ({row}, {column}, {size})

    </div>
  );
}

export default Cell;