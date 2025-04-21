import { IoAdd } from "react-icons/io5";

interface AddCardProps{
  setIsAddNewTask: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddCard({setIsAddNewTask}: AddCardProps) {
  const handleAddTask = () => {
    setIsAddNewTask(true);
  }
  return (
    <>
      <div className="text-txtColor h-9 flex px-4 items-center text-[14px] hover:cursor-pointer"
      onClick={handleAddTask}
      >
        <span className="mr-2 text-[18px]">
          <IoAdd />
        </span>
        <span>Add a card</span>
      </div>
    </>
  );
}
