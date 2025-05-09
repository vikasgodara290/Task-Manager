//import { useState } from "react";
import { CiEdit } from "react-icons/ci";

interface EditTaskProps {
  setIsEditTask: React.Dispatch<React.SetStateAction<boolean>>;
  task: string;
}

const EditTask = ({ setIsEditTask }: EditTaskProps) => {
  //const [isEditTask, setIsEditTask] = useState<string>("false");

  const handleEditTask = () => {
    setIsEditTask(true);
  };

  const handlePointerDown = (e : React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <>
      <div
        className="text-[18px] hover:cursor-pointer"
        onClick={handleEditTask}
        onPointerDown={(e) => handlePointerDown(e)}
      >
        <CiEdit />
      </div>
    </>
  );
};

export default EditTask;
