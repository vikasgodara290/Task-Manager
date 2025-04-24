import { useState , useEffect} from "react";
import AddCard from "./AddCard";
import Task from "./Task";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
const URL = import.meta.env.VITE_URL;

interface CardProps {
  cardId: string;
  cardName: string;
}

const Card = ({ cardId, cardName}: CardProps) => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [tasks, setTasks] = useState<any>(undefined);

  useEffect(
    () => {
      //func which call itself
      (
        //async func can't be declared inside a useEffect directly
        async ()=>{
          let res = await axios.get(`${URL}task`);
          res = res.data;
          setTasks(res);
          console.log("from cards",res);
        }
      )();
    },
    []
  )
  return (
    <>
      <div className="bg-black rounded-[12px] w-min min-w-60 h-min m-4">
        <div className="text-txtColor font-medium flex justify-between px-4 h-9 text-[16px] items-center">
          <span>{cardName}</span>
          <div className="">
            <BsThreeDots />
          </div>
        </div>

        {tasks &&
          tasks.filter((task : any) => task.CardId === cardId).map((task: any) => {
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
            task={{id: 0, task: ""}}
            setTasks={setTasks}
            taskList={tasks}
            setIsAddNewTask={setIsAddNewTask}
            isAddNewTask={isAddNewTask}
          />
        )}
        {/*Add a Card Component*/}
        <AddCard setIsAddNewTask={setIsAddNewTask} />
      </div>
    </>
  );
};

export default Card;