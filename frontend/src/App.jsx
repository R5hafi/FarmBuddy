import { useState } from 'react'
import './App.css'
import Form from "./components/Form"
import GridView from "./components/GridView"

function App() {
  const [count, setCount] = useState(9) //size of grid

  //keeps track of grid size changes
  function changeCount(value) {
    setCount(value);
    console.log("Count: " + value);
  }

  return (
    <>
      <div>
        <h1>Plot Perfect</h1>
        <GridView size={count} setSize={changeCount}></GridView>
      </div>
    </>
  )
}

export default App
