import { useState } from "react";
import AddCard from "./AddCard";
import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";

const Card = () => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [task, setTask] = useState([
    {
      id : 1,
      task: "add to-do list feature in dashboard",
    },
    {
      id: 2,
      task: "add auth to application",
    },
    {
      id : 3,
      task: "implement logout feature in app. also prepare UI for logout function",
    },
  ]);
console.log(isAddNewTask);

  return (
    <>
      <div className="bg-black rounded-[12px] w-60 h-min m-10">
        <div className="text-txtColor font-medium flex justify-between px-4 h-9 text-[16px] items-center">
          <span>To Do</span>
          <div className="">
            <BsThreeDots />
          </div>
        </div>

        {task.map((task) => {
          return (
            <>
              <Task key={task.id} task={task.task} setTask={setTask} taskList = {task} setIsAddNewTask={setIsAddNewTask} isAddNewTask={isAddNewTask}/>
            </>
          );
        })}

        {isAddNewTask && <Task key={3423} task="" setTask={setTask} taskList = {task} setIsAddNewTask={setIsAddNewTask} isAddNewTask={isAddNewTask}/>}
        {/*Add a Card Component*/}
        <AddCard setIsAddNewTask={setIsAddNewTask} />
      </div>
    </>
  );
};

export default Card;
