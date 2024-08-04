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
            <Plant name="Sunflower" imageurl="https://www.gardendesign.com/pictures/images/675x529Max/site_3/ring-of-fire-sunflower-bicolor-sunflower-all-america-selections_12080.jpg"></Plant>
            <Plant name="Soybeans" imageurl="https://cdn.britannica.com/28/154828-050-05C6239A/Soybeans.jpg"></Plant>
            <Plant name="Lavender" imageurl="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Single_lavender_flower02.jpg/1200px-Single_lavender_flower02.jpg"></Plant>
            <Plant name="Wheat" imageurl="https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/publications/food-beverage-nutrition/foodnavigator.com/news/science/wheat-yields-boosted-and-protein-content-increased-by-up-to-25-study/15414079-1-eng-GB/Wheat-yields-boosted-and-protein-content-increased-by-up-to-25-study.jpg"></Plant>
          </div>
          
            <GridView count={count} setCount={changeCount} modalText={suggestion === "" ? "Sample placeholder." : suggestion}></GridView>
          </section>
       
        </SelectedCellProvider>
      </div>
      
    </>
  )
}

export default App
