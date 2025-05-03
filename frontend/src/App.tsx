import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";
import AddNewCard from "./components/AddNewCard";
const URL = import.meta.env.VITE_URL;

function App() {
  const [cards, setCards] = useState<any>([]);
  const [tasks, setTasks] = useState<any>(undefined);


  useEffect(() => {
    //func which call itself
    //async func can't be declared inside a useEffect directly
    (async () => {
      let res = await axios.get(`${URL}task`);
      res = res.data;
      setTasks(res);
      console.log("from cards", res);
    })();
  }, []);
  
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
    <div className="flex">
      <div className="flex">
        {cards.map((card: any) => {
          return (
            <Card key={card.CardId} tasks={tasks} setTasks={setTasks} cards={cards} cardId={card.CardId} cardName={card.CardName} setCards={setCards}/>
          );
        })}
      </div>
      <AddNewCard cards={cards} setCards={setCards} />
    </div>
  );
}

export default App;
