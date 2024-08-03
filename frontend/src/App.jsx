import { useState } from 'react'
import './App.css'
import Form from "./components/Form"
import GridView from "./components/GridView"
import Plant from "./components/Plant"
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
        <header className="header">
          <h1 className="title">Plot Perfect</h1>
        </header>
          <Form></Form>
          <div id="plant-list">
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
          </div>
          
          <GridView count={count} setCount={changeCount}></GridView>
        </SelectedCellProvider>
      </div>
    </>
  )
}

export default App
