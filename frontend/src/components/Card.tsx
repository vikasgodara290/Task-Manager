import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";



export default function Card() {
  return (
    <>
      <div className="bg-taskBgColor font-normal h-9 w-11/12 rounded-[8px] text-txtColor flex p-1  mx-auto items-center text-[12px] mb-2">
        <label className="flex ml-1 items-center group hover:cursor-pointer hover:transform hover:translate-x-1 transition-transform duration-700">
          <input type="checkbox" className="peer hidden" />
          <div className="mr-1 w-4 h-4 text-taskBgColor text-[12px] rounded-full 
            peer-checked:block peer-checked:border-green-300 peer-checked:bg-green-300
            hidden group-hover:block transition duration-500
            opacity-0 group-hover:opacity-100 peer-checked:opacity-100 border-gray-400
            border-2">
            <span className="">
              <LuCheck/>
            </span>
          </div>
          Add New Feature
        </label>
        <div className="ml-auto text-[18px] mr-1">
          <CiEdit />
        </div>
      </div>
    </>
  );
}
