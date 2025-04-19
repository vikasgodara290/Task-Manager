import { useRef, useState} from "react";
import Status from "./Status";
import EditTask from "./EditTask";

interface TaskProps {
  task : string
}
export default function Task({task} : TaskProps) {
  const editTaskRef = useRef<HTMLDivElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onClickHandlerLuCheck = ()=>{
    isChecked? setIsChecked(false) :setIsChecked(true);
  }

  let taskStyle= isChecked? "pr-1" : "pr-5";

  return (
    <>
      <div className="flex items-start group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor mx-auto my-2">
        <span className="mt-2.5 mx-1 shrink-0">
          <Status isChecked={isChecked} onClickHandlerLuCheck={onClickHandlerLuCheck}/>
        </span>
        
        <div
          id="task"
          className={`pl-1 ${taskStyle} group-hover:pr-1 py-2 hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700 text-[12px]`}
          ref={editTaskRef}
        >
          {task}
        </div>

        <span className="ml-auto mx-1 mt-2">
          <EditTask editTaskRef={editTaskRef} />
        </span>
        
      </div>
    </>
  );
}
