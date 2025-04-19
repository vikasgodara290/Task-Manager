//import { useState } from "react";
import { CiEdit } from "react-icons/ci";

interface EditTaskProps {
  editTaskRef: React.RefObject<HTMLDivElement | null>;
}

const EditTask = ({ editTaskRef }: EditTaskProps) => {
  //const [isEditTask, setIsEditTask] = useState<string>("false");

  const handleEditTask = () => {
    //setIsEditTask("true");
    editTaskRef.current?.focus();
  };

  return (
    <>
      <div
        className="ml-auto text-[18px] mr-1 hover:cursor-pointer"
        onClick={handleEditTask}
      >
        <CiEdit />
      </div>
    </>
  );
};

export default EditTask;
