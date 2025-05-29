import { FormEvent, useEffect, useRef, useState } from "react";
import Status from "./Status";
import EditTask from "./EditTask";
import axios from "axios";
import { TaskType } from "../utils/CustomDataTypes";
import { useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
const URL = import.meta.env.VITE_URL;

interface TaskProps {
  task: TaskType;
  setTasks?: any;
  taskList: TaskType[];
  setIsAddNewTask?: any;
  isAddNewTask: boolean;
  isTaskDragOvered? : string | null;
}
export default function Task({
  task,
  setTasks,
  setIsAddNewTask,
  isAddNewTask,
  isTaskDragOvered
}: TaskProps) {
  const editTaskRef = useRef<HTMLTextAreaElement | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(task.isDone);
  const [isEditTask, setIsEditTask] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<string>(task.Task);
  const [isTaskDragged, setIsTaskDragged] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  //Context Menu
  //---------------------------------------------------------------------//
  //Hide Menu
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleContextMenuOfTask = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
    setVisible(true);
  };

  const handleTaskDelete = async () => {
    const res = await axios.delete(`${URL}task/${task._id}`);
    setTasks(res.data);
  };
  //---------------------------------------------------------------------//

  //Add new task + save edited task
  //---------------------------------------------------------------------//
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
        cardId: task.CardId,
        isDone: isChecked,
        assignee: "681611c60a4a306175553be2",
        createdBy: "681611c60a4a306175553be2",
        modifiedBy: "681611c60a4a306175553be2",
      });
      const tasks: TaskType[] = res.data;
      setTasks(tasks);
      setIsAddNewTask(false);
      setIsEditTask(false);
      return;
    }
    if (editTaskRef.current) {
      const res = await axios.put(`${URL}task`, {
        id: editTaskRef.current.id,
        task: editTaskRef.current?.value,
        cardId: task.CardId,
        isDone: isChecked,
        assignee: "681611c60a4a306175553be2",
        modifiedBy: "681611c60a4a306175553be2",
      });
      const editedTask: TaskType = res.data;

      setEditedTask(editedTask.Task);
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
  //---------------------------------------------------------------------//

  //DnD using dnd-kit
  //---------------------------------------------------------------------//
  const { attributes, listeners, transform, setNodeRef } = useDraggable({
    id: task._id,
    data: {
      type: "onCard",
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const { setNodeRef: setsecondNodeRef } = useDroppable({
    id: task._id,
    data: {
      accepts: ["onTask"],
    },
  });

  const conditionalProps =
    !isAddNewTask && !isEditTask
      ? {
          ...listeners,
          ...attributes,
          style,
          ref: (node: HTMLElement | null) => {
            setNodeRef(node);
            setsecondNodeRef(node);
          },
        }
      : {};

  useEffect(()=> {
    console.log(isTaskDragOvered);

  },[isTaskDragOvered])

  //---------------------------------------------------------------------//

  return (
    <>
      {/* {<div className="flex justify-center" ref={setsecondNodeRef}>
        <DropDiv height="min-h-9" />
      </div>} */}
      <div
        //draggable
        id={task._id}
        className={`flex ${
          (isTaskDragOvered === task._id)
            ? " border-t-2 border-blue-300 "
            : " border-t-2 border-black "
        } ${
          isTaskDragged && "hover:border-blue-300"
        } items-start group bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor mx-auto my-0.5`}
        // onDragStart={(e) => handleTaskDragStart(e)}
        // onDragOver={(e) => handleOnTaskDragOver(e)}
        // onDragLeave={(e) => handleOnTaskDragLeave(e)}
        // onDrop={(e) => handleTaskDropOnTask(e)}
        // onContextMenu={(e) => handleContextMenuOfTask(e)}
        {...conditionalProps}
      >
        <span className="mt-2.5 mx-1 shrink-0">
          <Status
            taskId={task._id}
            isDone={task.isDone}
            isChecked={isChecked}
            setIsChecked={setIsChecked}
          />
        </span>

        <div
          id={task._id}
          className={`pl-1 ${taskStyle} w-full group-hover:pr-1 py-2 hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700 text-[12px]`}
        >
          {isEditTask ? (
            <>
              <textarea
                id={task._id}
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
            <span id={task._id}>{editedTask}</span>
          ) : (
            ""
          )}
        </div>

        <div>
          {visible && (
            <div
              ref={menuRef}
              style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                borderRadius: "4px",
                zIndex: 1000,
              }}
              className="py-2 px-10 bg-black/70 text-txtColor hover:cursor-pointer"
              onClick={handleTaskDelete}
            >
              delete
            </div>
          )}
        </div>

        {!isAddNewTask && (
          <span className="ml-auto mx-1 mt-2">
            <EditTask task={task.Task} setIsEditTask={setIsEditTask} />
          </span>
        )}
      </div>
    </>
  );
}
