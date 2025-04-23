import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";
const URL = import.meta.env.VITE_URL;


function App() {
  const [cards, setCards] = useState<any>([]);

  useEffect(
    () => {
      (
        //this function will get cards
        async ()=>{
          let res = await axios.get(`${URL}card`);
          res = res.data;
          setCards(res);
          console.log(res);
        }
      )();
    },
    []
  )
  return (
    <>
    <div className="flex">
      {       
        cards.map((card : any) => {
          return(
            <>
              <Card cardId={card.CardId} cardName={card.CardName}/>
            </>
          )
        })       
      }
    </div>
    </>
  );
}

export default App;
