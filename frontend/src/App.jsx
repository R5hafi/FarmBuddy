import { useState } from 'react'
import './App.css'
import Form from "./components/Form"
import GridView from "./components/GridView"
import Plant from "./components/Plant"
import { useContext, useEffect } from 'react';
import  { SelectedCellProvider } from './contexts/SelectedCellContext'; 
import { CohereClient } from "cohere-ai";

function App() {
  const [count, setCount] = useState(9) //size of grid
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
        console.log("In effect");
        let userPrompt = "Give me good conditions to grow a sunflower.";
        const cohere = new CohereClient({
          token: "tqkSCR8CxE5MOFqX3wQcDYcqTpjennDR9h20qns8",
      });

      (async () => {
          const prediction = await cohere.generate({
              prompt: userPrompt,
              maxTokens: 1000,
          });
          
          try {
            setSuggestion(prediction.generations[0].text);
          } catch (error) {
             console.error(error);
          }
      })();

  }, []);
  //keeps track of grid size changes
  function changeCount(value) {
    setCount(value);
    console.log("Count: " + value);
  }

  return (
    <>
      <div>
        <SelectedCellProvider>
        <section className="soil">

        
        <header className="header">
          <h1 className="title">Plot Perfect</h1>
        </header>

          <Form></Form>
          <div id="plant-list">
            <Plant name="Rice" imageurl="https://www.apnikheti.com/upload/organic/1974idea99organic-rice1.jpg"></Plant>
            <Plant name="Coffee" imageurl="https://safras.com.br/wp-content/uploads/2021/03/cafe-graos-23-1.jpg"></Plant>
            <Plant name="Banana" imageurl="https://hartley-botanic.com/wp-content/uploads/2017/01/Image-1-Jan-2017.jpg"></Plant>
            <Plant name="Cotton" imageurl="https://cdn.britannica.com/18/156618-050-39339EA2/cotton-harvesting.jpg"></Plant>
          </div>
          
            <GridView count={count} setCount={changeCount} modalText={suggestion === "" ? "Sample placeholder." : suggestion}></GridView>
          </section>
       
        </SelectedCellProvider>
      </div>
      
    </>
  )
}

export default App
