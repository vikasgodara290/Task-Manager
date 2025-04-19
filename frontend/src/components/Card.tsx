import AddCard from "./AddCard";
import Task from "./Task";
import { BsThreeDots } from "react-icons/bs";

const Card = () => {
  return (
    <>
      <div className="bg-black rounded-[12px] w-60 h-min m-10">
        <div className="text-txtColor font-medium flex justify-between px-4 h-9 text-[16px] items-center">
          <span>To Do</span>
          <div className="">
            <BsThreeDots />
          </div>
        </div>
        {/*Task Component*/}
        <Task task="add to-do list feature in dashboard"/>
        <Task task="add auth to application"/>
        <Task task="add profile page in app"/>
        <Task task="implement logout feature in app. also prepare UI for logout function"/>
        {/*Add a Card Component*/}
        <AddCard />
      </div>
    </>
  );
};

export default Card;
