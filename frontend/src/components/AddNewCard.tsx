import { FaPlus } from "react-icons/fa6";

const AddNewCard = () => {
  return (
    <>
      <div
        className="bg-white/30 rounded-[12px] w-min min-w-60 h-10 m-4
      flex items-center text-[14px] hover:cursor-pointer"
      >
        <span className="px-2">
          <FaPlus />
        </span>
        <span>Add another list</span>
      </div>
    </>
  );
};

export default AddNewCard;
