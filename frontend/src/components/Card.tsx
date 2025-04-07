import { CiEdit } from "react-icons/ci";

export default function Card() {
  return (
    <>
      <div className="bg-taskBgColor font-normal h-9 w-11/12 rounded-[8px] text-txtColor flex p-1  mx-auto items-center text-[12px] mb-2">
        <input type="checkbox" className="mr-1 ml-1" />
        <span>Add new feature</span>
        <div className="ml-auto text-[18px] mr-1">
          <CiEdit />
        </div>
      </div>
    </>
  );
}
