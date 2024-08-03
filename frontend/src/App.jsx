import { useState } from 'react'
import './App.css'
import GridView from './components/GridView'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        hello.
        <GridView></GridView>
      </div>
    </>
  )
}

export default App
