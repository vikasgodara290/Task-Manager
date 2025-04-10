import { CiEdit } from "react-icons/ci";
import { LuCheck } from "react-icons/lu";

export default function Card() {
  return (
    <>
      <div className="bg-taskBgColor font-normal h-min min-h-9 w-11/12 rounded-[8px] text-txtColor flex px-1 py-2  mx-auto items-center text-[12px] my-2">
        <label className="flex flex-nowrap ml-1 mr-2 group hover:cursor-pointer hover:transform hover:translate-x-0.5 transition-transform duration-700">
          <input type="checkbox" className="peer hidden" />
          <div
            className="mr-1.5 mt-[1px] w-4 h-4 text-taskBgColor text-[12px] rounded-full 
            peer-checked:block peer-checked:border-green-300 peer-checked:bg-green-300
            hidden group-hover:block transition duration-500 opacity-0 group-hover:opacity-100 
            peer-checked:opacity-100 border-gray-400 border-2"
          >
            <span className="">
              <LuCheck />
            </span>
          </div>
          Add New Feature Ad New Feature Add New Feature Ad New Feature
        </label>
        <div className="ml-auto text-[18px] mr-1 hover:cursor-pointer">
          <CiEdit />
        </div>
      </div>
    </>
  );
}
