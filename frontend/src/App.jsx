import { useState } from 'react';
import './App.css';
import Form from "./components/Form";
import GridView from "./components/GridView";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Form></Form>
        <GridView></GridView>
      </div>
    </>
  )
}

export default App
