import { useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";

export default function Card() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEditTask, setIsEditTask] = useState<any>("false");
  const editTaskRef = useRef<HTMLDivElement|null>(null);

  const onClickHandlerLuCheck = ()=>{
    isChecked? setIsChecked(false) :setIsChecked(true);
  }

  const handleEditTask = () =>{
    setIsEditTask("true");
    editTaskRef.current?.focus();
  }

  const uncheckedStyle = isChecked? 'border-green-300 bg-green-300 ' : 'border-gray-400 hidden ' ;
  const checkedStyle = isChecked? 'block ' : 'hidden ';

  return (
    <>
      <div className="group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor flex px-1 py-2  mx-auto items-center text-[12px] my-2">
        <div
          className={`${uncheckedStyle}mr-1.5 mt-[1px] h-4 w-9 rounded-full
            text-[12px] group-hover:block border-2`}
          onClick={onClickHandlerLuCheck}
        >
          <span className={`${checkedStyle}text-black`}>
            <LuCheck />
          </span>
        </div>

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
