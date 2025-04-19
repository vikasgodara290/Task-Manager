import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import Status from "./Status";

export default function Card() {
  const [isEditTask, setIsEditTask] = useState<any>("false");
  const editTaskRef = useRef<HTMLDivElement|null>(null);

  const handleEditTask = () =>{
    setIsEditTask("true");
    editTaskRef.current?.focus();
  }

  return (
    <>
      <div className="group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor flex px-1 py-2  mx-auto items-center text-[12px] my-2">
        <Status/>
        <div
          id="task"
          className="flex flex-nowrap ml-1 mr-2 group hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700"
          tabIndex={1}
          ref={editTaskRef}
          contentEditable={isEditTask}
        >
          Add New Feature Ad New Feature Add New Feature Ad New Feature
        </div>
        <div
          className="ml-auto text-[18px] mr-1 hover:cursor-pointer"
          onClick={handleEditTask}
        >
          <CiEdit />
        </div>
      </div>
    </>
  );
}
