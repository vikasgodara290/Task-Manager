import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";
import AddNewCard from "./components/AddNewCard";
import { CardType, TaskType } from "./utils/CustomDataTypes";
const URL = import.meta.env.VITE_URL;

function App() {
  const [cards, setCards] = useState<CardType[] >([]);
  const [tasks, setTasks] = useState<TaskType[] >([]);

  useEffect(() => {
    //func which call itself
    //async func can't be declared inside a useEffect directly
    (async () => {
      const res = await axios.get(`${URL}task`);
      const tasks: TaskType[] = res.data;
      setTasks(tasks);
      console.log("from cards", tasks);
    })();
  }, []);

  useEffect(() => {
    //this function will get cards
    (async () => {
      const res = await axios.get(`${URL}card`);
      const cards: CardType[] = res.data;
      setCards(cards);
    })();
  }, []);

  console.log(cards);

  return (
    <div className="flex">
      <div className="flex">
        {cards &&
          tasks &&
          cards.map((card: CardType) => {
            return (
              <Card
                key={card._id}
                tasks={tasks}
                setTasks={setTasks}
                card={card}
                setCards={setCards}
              />
            );
          })}
      </div>
      <AddNewCard setCards={setCards} />
    </div>
  );
}

export default App;
