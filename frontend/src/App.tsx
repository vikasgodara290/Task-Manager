import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";
import AddNewCard from "./components/AddNewCard";
import { CardType, TaskType } from "./utils/CustomDataTypes";
import { DndContext, DragEndEvent, DragOverEvent } from "@dnd-kit/core";
const URL = import.meta.env.VITE_URL;

function App() {
  const [cards, setCards] = useState<CardType[]>([]);
  // const [tasks, setTasks] = useState<TaskType[]>([]);
  // const [isTaskDragOvered, setIsTaskDragOvered] = useState<string | null>(null);

  //Get all tasks from backend
  //-------------------------------------------------------------------------//
  // useEffect(() => {
  //   //func which call itself
  //   //async func can't be declared inside a useEffect directly
  //   (async () => {
  //     const res = await axios.get(`${URL}task`);
  //     const tasks: TaskType[] = res.data;
  //     setTasks(tasks);
  //     console.log("from cards", tasks);
  //   })();
  // }, []);
  //-------------------------------------------------------------------------//

  //get all cards from backend
  //-------------------------------------------------------------------------//
  useEffect(() => {
    //this function will get cards
    (async () => {
      const res = await axios.get(`${URL}card`);
      const cards: CardType[] = res.data;
      setCards(cards);
    })();
  }, []);
  //-------------------------------------------------------------------------//

  //Drop logic for cards using dndContext
  //-------------------------------------------------------------------------//
  // const handleOnTaskDragEnd = async (e : DragEndEvent) => {
  //   const {active, over} = e; 
  //   console.log('from task', active.id, over?.data, over?.data.current?.accepts);
  //   setIsTaskDragOvered(null)
  //   if(over?.data.current?.accepts[0] === "onTask"){
  //     const res = await axios.put(`${URL}reorder`, {
  //       droppedId: active.id,
  //       droppedOnId: over.id,
  //     });
  //     setTasks(res.data);
  //     return;
  //   }

  //   const res = await axios.put(`${URL}reposition`, {
  //     id: active.id,
  //     cardId: over?.id,
  //   });
  //   if (res) {
  //     const tasks : TaskType[] = res.data;
  //     setTasks(tasks);
  //   }
  // }

  // const handleTaskDragOver = async (e : DragOverEvent) => {
  //   const {over, active} = e;
  //   console.log('from drag over', active.id, over?.id);
  //   if(over){
  //     setIsTaskDragOvered( String ( over?.id ))
  //   }
  // }
  //-------------------------------------------------------------------------//

  return (
    <div className="flex">
      <DndContext onDragEnd={handleOnTaskDragEnd} onDragOver={handleTaskDragOver}>
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
                  isTaskDragOvered={isTaskDragOvered}
                />
              );
            })}
        </div>
      </DndContext>
      <AddNewCard setCards={setCards} />
    </div>
  );
}

export default App;
