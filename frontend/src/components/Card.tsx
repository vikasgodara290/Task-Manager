import { useState } from "react";
import AddCard from "./AddCard";
import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";

interface CardProps{
  tasks : any;
  setTasks : React.Dispatch<React.SetStateAction<any>>
}

const Card = ({tasks, setTasks}: CardProps) => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);

  return (
    <>
      <div className="bg-black rounded-[12px] w-60 h-min m-4">
        <div className="text-txtColor font-medium flex justify-between px-4 h-9 text-[16px] items-center">
          <span>To Do</span>
          <div className="">
            <BsThreeDots />
          </div>
        </div>

        {tasks.map((task : any) => {
          console.log('card',task.Task);
          
          return (
            <>
              <Task
                key={task.id}
                taskId={task.id}
                task={task.Task}
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
            taskId={0}
            task=""
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
