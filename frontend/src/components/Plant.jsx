import React from "react"
import '../styles/Plant.css'
function Plant({name, imageurl}) {
  return (
    <>
      <div className="plant-container">
        <span>{name}</span>
        <img src={imageurl} alt={"Picture of " + name} height="100px" width="100px"/>
      </div>  
      
    </>
  )
}

export default Plant