import React from 'react';
import "../styles/Cell.css"

function Cell({ id, row, column }) {

  function handleClick() {
    document.getElementById(id).classList.toggle("highlight");
    //console.log(`clicked`);
    //console.log(document.getElementById(id));
  }

  return (
    <div id={id} className="cell" onClick={() => handleClick()}>
      Cell ({row}, {column})
    </div>
  );
}

export default Cell;