import express from "express";
import cors from "cors";
import {v4 as uuidv4} from "uuid"
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

/*-------
Task model/object
    Id
    Desc
    Status
    Assignee
    CreatedOn
    CreatedBy
    ModifiedOn
    ModifiedBy
-------*/
let idCounter = 1000; 

let Cards = [
  {
    CardId: 990,
    CardName: "To Do",
  },
  {
    CardId: 991,
    CardName: "Doing",
  },
  {
    CardId: 992,
    CardName: "Done",
  },
];

let Tasks = [
  {
    id: 1,
    Task: "Go To Gym",
    CardId: 990,
    isDone: false,
    Assignee: 111,
    CreatedOn: "07-Apr-2025 6:00 PM",
    CreatedBy: 100,
    ModifiedOn: "",
    ModifiedBy: 0,
    Order: 1
  },
  {
    id: 2,
    Task: "Complete Project Report",
    CardId: 991,
    isDone: false,
    Assignee: 112,
    CreatedOn: "06-Apr-2025 10:00 AM",
    CreatedBy: 100,
    ModifiedOn: "07-Apr-2025 9:00 AM",
    ModifiedBy: 112,
    Order: 1
  },
  {
    id: 3,
    Task: "Prepare Presentation",
    CardId: 992,
    isDone: true,
    Assignee: 113,
    CreatedOn: "05-Apr-2025 2:00 PM",
    CreatedBy: 100,
    ModifiedOn: "06-Apr-2025 4:00 PM",
    ModifiedBy: 113,
    Order: 1
  },
];
let Users = [
  {
    id: 100,
    name: "Admin",
    role: "Administrator",
  },
  {
    id: 111,
    name: "Ajay",
    role: "Developer",
  },
  {
    id: 112,
    name: "Vikas",
    role: "Project Manager",
  },
  {
    id: 113,
    name: "Rohit",
    role: "Designer",
  },
];

app.get("/task", (req, res) => {
  res.json(Tasks);
});

app.get("/card", (req, res) => {
  res.json(Cards);
});

app.get("/taskById/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json(Tasks.filter((tasks) => tasks.id == id));
});

app.post("/task", (req, res) => {
  const id = idCounter++;
  const { task, cardId, isDone, assignee, createdBy } = req.body;

  const TasksByCardId = Tasks.filter(task => task.CardId === cardId);

  // Create a new task object
  const newTask = {
    id,
    Task: task,
    CardId: cardId,
    isDone: isDone, // Default status to "Todo" if not provided
    Assignee: assignee,
    CreatedOn: new Date().toLocaleString(), // Set current date and time
    CreatedBy: createdBy,
    ModifiedOn: "",
    ModifiedBy: 0,
    Order : TasksByCardId.length + 1
  };

  Tasks.push(newTask);
  res.status(201).json(newTask);
});

app.post("/card", (req, res) => {
  const id = idCounter++;
  const { cardName } = req.body;

  // Create a new task object
  const newCard = {
    CardId: id,
    CardName: cardName,
  };

  Cards.push(newCard);
  res.status(201).json(newCard);
});

//delete a task
app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  Tasks = Tasks.filter((task) => task.id !== id);
  res.status(200).json(Tasks);
});

app.delete("/card/:cardId", (req, res) => {
  const cardId = Number (req.params.cardId);
  Tasks = Tasks.filter(task => task.CardId !== cardId);
  Cards = Cards.filter(card => card.CardId !== cardId);
  res.json({Cards, Tasks});
});

//edit a task
app.put("/task", (req, res) => {
  // Extract data from the request body
  const { id, task, cardId, isDone, assignee, modifiedBy, order } = req.body;
  // Find the task by ID

  const taskIndex = Tasks.findIndex((task) => task.id === parseInt(id, 10));

  if (taskIndex === -1) {
    // If the task is not found, return a 404 error
    res.status(404).json({ message: `Task with id ${id} not found.` });
    return;
  }

  // Update the task properties
  Tasks[taskIndex] = {
    ...Tasks[taskIndex], 
    Task: task || Tasks[taskIndex].Task, // Update only if provided
    CardId: cardId || Tasks[taskIndex].CardId,
    isDone: isDone ?? Tasks[taskIndex].isDone,
    Assignee: assignee || Tasks[taskIndex].Assignee,
    CreatedOn: Tasks[taskIndex].CreatedOn, // Set current date and time
    CreatedBy: Tasks[taskIndex].CreatedBy,
    ModifiedOn: new Date().toLocaleString(), // Set the current date and time
    ModifiedBy: modifiedBy || Tasks[taskIndex].ModifiedBy,
    Order: order || Tasks[taskIndex].Order
  };

  // Respond with the updated task
  res.status(200).json(Tasks[taskIndex]);
});

app.put("/reposition", (req, res) => {
  // Extract data from the request body
  const { id, cardId} = req.body;

  const taskIndex = Tasks.findIndex((task) => task.id === parseInt(id, 10));

  if (taskIndex === -1) {
    // If the task is not found, return a 404 error
    res.status(404).json({ message: `Task with id ${id} not found.` });
    return;
  }

  // Update the task properties
  Tasks[taskIndex] = {
    ...Tasks[taskIndex],
    CardId: cardId || Tasks[taskIndex].CardId
  };

  // Respond with the updated task
  res.status(200).json(Tasks);
});

app.put("/reorder", (req, res) => {
  // Extract data from the request body
  const { droppedId, droppedOnId} = req.body;

  const taskDroppedOnIndex = Tasks.findIndex((task) => task.id === parseInt(droppedOnId, 10));
  const taskDroppedIndex = Tasks.findIndex((task) => task.id === parseInt(droppedId, 10));
  
  if (taskDroppedOnIndex === -1) {
    // If the task is not found, return a 404 error
    res.status(404).json({ message: `Task with id ${droppedOnId} not found.` });
    return;
  }
  
  // Update the task properties
  Tasks[taskDroppedIndex] = {
    ...Tasks[taskDroppedIndex],
    CardId: Tasks[taskDroppedOnIndex].CardId
  };


  const [item] = Tasks.splice(taskDroppedIndex, 1);
  Tasks.splice(taskDroppedOnIndex , 0, item);

  console.log(Tasks);
  
  // Respond with the updated task
  res.status(200).json(Tasks);
});

app.put("/card", (req, res) => {
  const { cardId, cardName } = req.body;

  const cardIndex = Cards.findIndex(
    (card) => card.CardId === parseInt(cardId, 10)
  );

  if (cardIndex === -1) {
    res.status(404).json({ message: `Task with id ${cardId} not found.` });
    return;
  }

  Cards[cardIndex] = {
    ...Cards[cardIndex],
    CardName: cardName,
  };

  res.status(200).json(Cards[cardIndex]);
});

app.listen(PORT, () => {
  console.log(`task manager app's backend is listening to PORT ${PORT}`);
});
