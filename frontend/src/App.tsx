import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";
import AddNewCard from "./components/AddNewCard";
const URL = import.meta.env.VITE_URL;

function App() {
  const [cards, setCards] = useState<any>([]);

  useEffect(() => {
    //this function will get cards
    (async () => {
      let res = await axios.get(`${URL}card`);
      res = res.data;
      setCards(res);
    })();
  }, []);

  console.log(cards);

  return (
    <div className="flex w-screen h-screen bg-linear-to-bl from-violet-500 to-fuchsia-500">
      <div className="flex">
        {cards.map((card: any) => {
          return (
            <>
              <Card cardId={card.CardId} cardName={card.CardName} />
            </>
          );
        })}
      </div>
      <AddNewCard cards={cards} setCards={setCards} />
    </div>
  );
}

export default App;
