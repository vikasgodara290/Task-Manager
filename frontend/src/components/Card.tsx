import { useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";

export default function Card() {
  const taskRef = useRef<HTMLDivElement | null>(null);
  function onClickHandler(e: MouseEvent) {
    console.log(taskRef);
    if (taskRef.current) {
      taskRef.current.contentEditable = "true";
      taskRef.current.focus();
    }
  }

  return (
    <>
      <div className="group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor flex px-1 py-2  mx-auto items-center text-[12px] my-2">
        <div
          className="mr-1.5 mt-[1px] w-4 h-4 text-taskBgColor 
            text-[12px] rounded-full peer-checked:block 
            peer-checked:border-green-300 peer-checked:bg-green-300
            hidden group-hover:block transition duration-500 opacity-0 
            group-hover:opacity-100 peer-checked:opacity-100 
            border-gray-400 border-2"
        >
          <span className="">
            <LuCheck />
          </span>
        </div>

        <div
          ref={taskRef}
          id="task"
          className="flex flex-nowrap ml-1 mr-2 group hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700"
        >
          Add New Feature Ad New Feature Add New Feature Ad New Feature
        </div>
        <div
          className="ml-auto text-[18px] mr-1 hover:cursor-pointer"
          onClick={onClickHandler}
        >
          <CiEdit />
        </div>
      </div>
    </>
  );
}
