import { LuCheck } from "react-icons/lu";

interface StatusProps {
    isChecked : boolean | null,
    onClickHandlerLuCheck : any
}
const Status = ({isChecked, onClickHandlerLuCheck} : StatusProps) => {

  const uncheckedStyle = isChecked
    ? "border-green-300 bg-green-300 "
    : "border-gray-400 hidden";
  const checkedStyle = isChecked ? "block " : "hidden ";

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
