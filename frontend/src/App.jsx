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
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
            <Plant name="Plant" imageurl="https://laidbackgardener.blog/wp-content/uploads/2017/11/20171205a-petr-kratochvil-publicdomainepictures-net.jpg"></Plant>
          </div>
          
            <GridView count={count} setCount={changeCount} modalText={suggestion === "" ? "Sample placeholder." : suggestion}></GridView>
          </section>
       
        </SelectedCellProvider>
      </div>
      
    </>
  )
}

export default App
