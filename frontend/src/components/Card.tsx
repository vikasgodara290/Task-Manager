import { useState, useEffect, useRef } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
const URL = import.meta.env.VITE_URL;

interface CardProps {
  cards : any;
  cardId: string;
  cardName: string;
  tasks: any;
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  setCards: React.Dispatch<React.SetStateAction<any>>;
}

const Card = ({ tasks, setTasks, cards, cardId, cardName, setCards }: CardProps) => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [isCard, setIsCard] = useState<boolean>(false);
  const cardNameRef = useRef<HTMLInputElement | null>(null);

  const saveInput = async (value: string) => {
    await axios.put(`${URL}card`, { cardId: cardId, cardName: value });
    console.log("Input saved:", value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (cardNameRef.current) {
        saveInput(cardNameRef.current?.value);
      }
    }
  };

  const handleBlur = () => {
    if (cardNameRef.current) {
      saveInput(cardNameRef.current?.value);
    }
  };

  const handleTaskDragOver = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    //console.log('drag over', e.target);
    
  }
  const handleTaskDrop = async (e : React.DragEvent<HTMLDivElement>) => {
    let cardEl = (e.target as HTMLElement);
    console.log('task droped', e, e.dataTransfer.getData('text/plain'));
    
    while(!isCard){
      console.log(isCard, cardEl);
      if(cardEl.className.includes('card') && e.dataTransfer.getData('text/plain')){
        console.log(cardEl.id);
        setIsCard(true)
        const res = await axios.put(`${URL}reposition`, {
          id: Number(e.dataTransfer.getData('text/plain')),
          cardId: Number(cardEl.id),
        });
        console.log(res);
        if(res) {
          setTasks(res.data)
        }
      }
      else{
        cardEl = cardEl.parentElement as HTMLElement
      }
    }
    console.log(isCard, cardEl);
  }

  return (
    <>
      <div id={cardId} onDragOver={(e) => handleTaskDragOver(e)} onDrop={e => handleTaskDrop(e)} className="card bg-black rounded-[12px] w-min min-w-60 h-min m-4">
        <div className="text-txtColor font-medium flex justify-between px-4 h-9 text-[16px] items-center">
          <input
            defaultValue={cardName}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            ref={cardNameRef}
            className="border-2 border-black focus:border-blue-300 focus:px-1 mr-2 rounded-[2px] w-full outline-none hover:cursor-pointer"
          />
          <div className="">
            <BsThreeDots />
          </div>
        </div>

        {tasks &&
          tasks
            .filter((task: any) => task.CardId === cardId)
            .map((task: any) => {
              console.log("card", task.Task);
              return (
                <>
                  <Task
                    key={task.id}
                    cardId={cardId}
                    task={task}
                    setTasks={setTasks}
                    taskList={tasks}
                    setIsAddNewTask={setIsAddNewTask}
                    isAddNewTask={isAddNewTask}
                  />
                </>
              );
            })}

        {isAddNewTask && (
          <Task
            key={3423}
            cardId={cardId}
            task={{ id: 0, task: "" }}
            setTasks={setTasks}
            taskList={tasks}
            setIsAddNewTask={setIsAddNewTask}
            isAddNewTask={isAddNewTask}
          />
        )}
        {/*Add a Card Component*/}
        <AddNewTask setIsAddNewTask={setIsAddNewTask} />
      </div>
    </>
  );
};

export default Card;
