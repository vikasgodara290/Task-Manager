import { FormEvent, useEffect, useRef, useState } from "react";
import Status from "./Status";
import EditTask from "./EditTask";
import axios from "axios";
const URL = import.meta.env.VITE_URL;

interface TaskProps {
  task: any;
  cardId: string;
  setTasks?: any;
  taskList: any;
  setIsAddNewTask?: any;
  isAddNewTask: boolean;
}
export default function Task({
  task,
  cardId,
  setTasks,
  taskList,
  setIsAddNewTask,
  isAddNewTask,
}: TaskProps) {
  const editTaskRef = useRef<HTMLTextAreaElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(task.isDone);
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>(task.Task);
  console.log("this is from task: ", task.Task, task);

  console.log("task", task);

  useEffect(() => {
    if (!editedTask) {
      setIsEditTask(true);
      setIsAddNewTask(true);
    }
  }, []);

  const handleOnInputTask = (e: FormEvent<HTMLTextAreaElement>) => {
    (e.target as HTMLTextAreaElement).style.height = "auto"; // Reset the height
    (e.target as HTMLTextAreaElement).style.height = `${
      (e.target as HTMLTextAreaElement).scrollHeight
    }px`; // Set new height based on content
  };

  const handleSaveTask = async () => {
    if (isAddNewTask) {
      //task, cardId, isDone, assignee, createdBy
      const res = await axios.post(`${URL}task`, {
        task: editTaskRef.current?.value,
        cardId: cardId,
        isDone: isChecked,
        assignee: 111,
        createdBy: 110,
      });
      const newTask = res.data;
      setTasks([...taskList, newTask]);
      setIsAddNewTask(false);
      setIsEditTask(false);
      return;
    }
    if (editTaskRef.current) {
      //    "id": 1,task,cardId: 990,"isDone": false,"assignee": 111,"modifiedBy": ""
      console.log(editTaskRef.current.id);

      const res = await axios.put(`${URL}task`, {
        id: Number(editTaskRef.current.id),
        task: editTaskRef.current?.value,
        cardId: cardId,
        isDone: isChecked,
        assignee: 111,
        modifiedBy: "",
      });
      const editedTask = res.data;
      console.log(editedTask);

      setEditedTask(editedTask.Task);
      setIsEditTask(false);
      setIsAddNewTask(false);
    }
  };

  const handleTaskDragStart = (e : React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', (e.target as HTMLDivElement)?.id);
    console.log('drag started', (e.target as HTMLDivElement)?.id);
    
  }

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
      <div draggable id={String(task.id)} className="flex border-2 border-black hover:border-blue-300 items-start group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor mx-auto my-2"
        onDragStart={e => handleTaskDragStart(e)}
        >
        <span className="mt-2.5 mx-1 shrink-0">
          <Status
            taskId={task.id}
            isDone={task.isDone}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </span>

        <div
          id={String(task.id)} 
          className={`pl-1 ${taskStyle} w-full group-hover:pr-1 py-2 hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700 text-[12px]`}
        >
          {isEditTask ? (
            <>
              <textarea
                id={String(task.id)}
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
            <span id={String(task.id)}>{editedTask}</span>
          ) : (
            ""
          )}
        </div>

        {!isAddNewTask && (
          <span className="ml-auto mx-1 mt-2">
            <EditTask task={task} setIsEditTask={setIsEditTask} />
          </span>
        )}
      </div>
    </>
  );
}
