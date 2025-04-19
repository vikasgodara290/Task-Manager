import {useState} from 'react';
import { LuCheck } from "react-icons/lu";

const Status = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const uncheckedStyle = isChecked
    ? "border-green-300 bg-green-300 "
    : "border-gray-400 hidden ";
  const checkedStyle = isChecked ? "block " : "hidden ";

  const onClickHandlerLuCheck = ()=>{
    isChecked? setIsChecked(false) :setIsChecked(true);
  }

  return (
    <>
      <div
        className={`${uncheckedStyle}mr-1.5 mt-[1px] h-4 w-9 rounded-full
            text-[12px] group-hover:block border-2`}
        onClick={onClickHandlerLuCheck}
      >
        <span className={`${checkedStyle}text-black`}>
          <LuCheck />
        </span>
      </div>
    </>
  );
};

export default Status;
