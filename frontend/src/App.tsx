import "./App.css";
import AddCard from "./components/AddCard";
import Card from "./components/Card";
import { BsThreeDots } from "react-icons/bs";

function App() {
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
        <Card />
        <Card />
        <Card />
        {/*Add a Card Component*/}
        <AddCard />
      </div>
    </>
  );
}

export default App;
