import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";
import axios from "axios";
const URL = import.meta.env.VITE_URL;


function App() {
  const [tasks, setTasks] = useState<any>([]);

  useEffect(
    () => {
      //func which call itself
      (
        //async func can't be declared inside a useEffect directly
        async ()=>{
          let res = await axios.get(`${URL}task`);
          res = res.data;
          setTasks(res);
          console.log(res);
        }
      )();
    },
    []
  )
  return (
    <>
      <div className="flex flex-wrap ">
        <Card tasks={tasks} setTasks={setTasks}/>
      </div>
    </>
  );
}

export default App;
