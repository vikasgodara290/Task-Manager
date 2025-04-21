import { FormEvent, useEffect, useRef, useState } from "react";
import Status from "./Status";
import EditTask from "./EditTask";

interface TaskProps {
  task: string;
  setTask: any;
  taskList: any;
  setIsAddNewTask: any;
  isAddNewTask: boolean;
}
export default function Task({ task, setTask , taskList, setIsAddNewTask, isAddNewTask}: TaskProps) {
  const editTaskRef = useRef<HTMLTextAreaElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>(task);

  useEffect(()=>{
    if(!editedTask){
      setIsEditTask(true);
      setIsAddNewTask(true);
    }
  },[])


  const onClickHandlerLuCheck = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  };

  const handleOnInputTask = (e: FormEvent<HTMLTextAreaElement>) => {
    (e.target as HTMLTextAreaElement).style.height = "auto"; // Reset the height
    (e.target as HTMLTextAreaElement).style.height = `${
      (e.target as HTMLTextAreaElement).scrollHeight
    }px`; // Set new height based on content
  };

  const handleSaveTask = () => {
    if(isAddNewTask){
      setTask([...taskList, {
        id: taskList.length,
        task: editTaskRef.current?.value
      }])
      setIsAddNewTask(false);
      setIsEditTask(false);
      return;
    }
    if (editTaskRef.current) {
      setEditedTask(editTaskRef.current?.value);
      setIsEditTask(false);
      setIsAddNewTask(false);
    }
  };

  let taskStyle = isChecked ? "pr-1" : "pr-5";

  useEffect(() => {
    if (isEditTask && editTaskRef.current) {
      editTaskRef.current?.focus();
      const length = editTaskRef.current.value.length;
      editTaskRef.current.setSelectionRange(length, length);
    }
  }, [isEditTask]);

  return (
    <>
      <div className="flex items-start group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor mx-auto my-2">
        <span className="mt-2.5 mx-1 shrink-0">
          <Status
            isChecked={isChecked}
            onClickHandlerLuCheck={onClickHandlerLuCheck}
          />
        </span>

        <div
          id="task"
          className={`pl-1 ${taskStyle} w-full group-hover:pr-1 py-2 hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700 text-[12px]`}
        >
          {isEditTask ? (
            <>
              <textarea
                ref={editTaskRef}
                className="w-full h-auto overflow-hidden outline-none resize-none p-0 m-0 bg-transparent text-inherit font-inherit"
                defaultValue={editedTask}
                onInput={(e) => handleOnInputTask(e)}
                onFocus={(e) => {
                  (e.target as HTMLTextAreaElement).style.height = "auto"; // Reset the height
                  (e.target as HTMLTextAreaElement).style.height = `${
                    (e.target as HTMLTextAreaElement).scrollHeight
                  }px`; // Set new height based on content
                }}
                onKeyDown={(e) => e.key === "Enter" && handleSaveTask()}
              ></textarea>
              <button
                className="bg-blue-400 text-black px-2 py-1 rounded-[6px] hover:cursor-pointer"
                onClick={handleSaveTask}
              >
                SAVE
              </button>
            </>
          ) : editedTask ? (
            editedTask
          ) : (
            ""
          )}
        </div>

        {!isAddNewTask &&
          <span className="ml-auto mx-1 mt-2">
          <EditTask task={task} setIsEditTask={setIsEditTask} />
        </span>}
      </div>
    </>
  );
}
