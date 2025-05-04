import { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import axios from "axios";
const URL = import.meta.env.VITE_URL;

interface StatusProps {
  isChecked: boolean | null;
  isDone : boolean;
  taskId: string;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
const Status = ({isDone, isChecked, setIsChecked, taskId}: StatusProps) => {
  console.log("this is from tatus: ",isDone);
  
  const uncheckedStyle = isChecked
    ? "border-green-300 bg-green-300 "
    : "border-gray-400 hidden";
  const checkedStyle = isChecked ? "block " : "hidden ";

  useEffect(()=>{
    console.log("this is from status: ",isChecked);
    (
      async () => {
        await axios.put(`${URL}task`,{
          id: taskId,
          isDone : isChecked
        })
      }
    )();
  },[isChecked])

  const onClickHandlerLuCheck = () => {
    isChecked ? setIsChecked(false) : setIsChecked(true);
  };

  return (
    <>
      <div
        className={`${uncheckedStyle} h-[16px] w-[16px] rounded-full border-2 group-hover:block`}
        onClick={onClickHandlerLuCheck}
      >
        <span className={`${checkedStyle}text-black text-[12px]`}>
          <LuCheck />
        </span>
      </div>
    </>
  );
};

export default Status;
