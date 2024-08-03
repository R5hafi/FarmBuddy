import { useState } from 'react'
import './App.css'
import Form from "./components/Form"
import GridView from "./components/GridView"
import { useContext } from 'react';
import  { SelectedCellProvider } from './contexts/SelectedCellContext'; 
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
        <SelectedCellProvider>
          <h1>Plot Perfect</h1>
          <GridView count={count} setCount={changeCount}></GridView>
        </SelectedCellProvider>
      </div>
    </>
  )
}

export default App
