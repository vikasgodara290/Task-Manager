import { useState, useRef } from "react";
import AddNewTask from "./AddNewTask";
import Task from "./Task";
import axios from "axios";
import { BsThreeDots } from "react-icons/bs";
import { CardType, TaskType } from "../utils/CustomDataTypes";
import { useDroppable } from "@dnd-kit/core";
const URL = import.meta.env.VITE_URL;

interface CardProps {
  card: CardType;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<any>>;
  setCards: React.Dispatch<React.SetStateAction<any>>;
  isTaskDragOvered : string | null
}

const Card = ({ tasks, setTasks, card, setCards, isTaskDragOvered }: CardProps) => {
  const [isAddNewTask, setIsAddNewTask] = useState<boolean>(false);
  const [isCardMenuOpen, setIsCardMenuOpen] = useState<boolean>(false);
  const [newCardName, setNewCardName] = useState<string>(card.CardName);
  const cardNameRef = useRef<HTMLInputElement | null>(null);

  //Saving Card Name
  //-------------------------------------------------------------------------//
  const saveInput = async (value: string) => {
    await axios.put(`${URL}card`, { cardId: card._id, cardName: value });
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
      setNewCardName(cardNameRef.current?.value);
    }
  };
  //-------------------------------------------------------------------------//

  //Context menu
  //-------------------------------------------------------------------------//
  const handleOnClickCardManu = () => {
    isCardMenuOpen ? setIsCardMenuOpen(false) : setIsCardMenuOpen(true);
  };

  const handleCardDelete = async () => {
    const res = await axios.delete(`${URL}card/${card._id}`);
    setCards(res.data.Cards);
    setTasks(res.data.Tasks);
    setIsCardMenuOpen(false);
  };
  //-------------------------------------------------------------------------//

  //Drop logic with dnd-kit
  //-------------------------------------------------------------------------//
  const { setNodeRef : setFirstNodeRef } = useDroppable({
    id: card._id,
    data: {
      accepts : ["onCard"]
    }
  });
  //-------------------------------------------------------------------------//

  return (
    <>
      <div
        id={card._id}
        // onDragOver={(e) => handleTaskDragOver(e)}
        // onDrop={(e) => handleTaskDrop(e)}
        ref={setFirstNodeRef}
        className={`card bg-black rounded-[12px] w-min min-w-60 h-min m-4 ${
          (isTaskDragOvered === card._id)
            ? " border-2 border-blue-300 "
            : " border-2 border-black "
        }` }
      >
        {isCardMenuOpen && (
          <div className="absolute rounded-[8px] w-25 h-25 bg-black/70 flex justify-center ml-35 mt-9">
            <div
              className="menuitem text-txtColor py-1 hover:cursor-pointer"
              onClick={handleCardDelete}
            >
              Delete
            </div>
          </div>
        )}
        <div className="cardHeader text-txtColor font-medium flex justify-between px-4 h-9 text-[16px] items-center">
          <input
            defaultValue={newCardName}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            ref={cardNameRef}
            className="border-2 border-black focus:border-blue-300 focus:px-1 mr-2 rounded-[2px] w-full outline-none hover:cursor-pointer"
          />
          <div className="hover:cursor-pointer" onClick={handleOnClickCardManu}>
            <BsThreeDots />
          </div>
        </div>

        {tasks &&
          tasks
            .filter((task) => task.CardId === card._id)
            .map((task: TaskType) => {
              return (
                <>
                  <div key={task._id} className="task border-t-2 border-black">
                    <Task
                      key={task._id}
                      task={task}
                      setTasks={setTasks}
                      taskList={tasks}
                      setIsAddNewTask={setIsAddNewTask}
                      isAddNewTask={isAddNewTask}
                      isTaskDragOvered = {isTaskDragOvered}
                    />
                  </div>
                </>
              );
            })}

        {isAddNewTask && (
          <Task
            key={3423}
            task={{
              _id: "0",
              Task: "",
              CardId: card._id,
              isDone: false,
              ModifiedBy: "",
              CreatedBy: "",
              Assignee: "",
              updatedAt: "",
              createdAt: "",
            }}
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
