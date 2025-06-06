import express from "express";
import cors from "cors";
import {v4 as uuidv4} from "uuid";
import dbConnect from "./dbConnect";
import { UserModel, TaskModel, CardModel } from "./db";
import mongoose from "mongoose";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());
dbConnect();

// sign up endpoint 
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (user) {
    res.status(400).json({ message: "User already exists" });
    return;
  }        
  const newUser = await UserModel.create({
    username,
    password,
    userId: uuidv4(),
  });
  res.status(201).json(newUser);
});

// login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.find({ username, password });
  if (user.length === 0) {
    res.status(400).json({ message: "Invalid username or password" });
    return;
  }
  res.status(200).json(user[0]);
});


//Return : All tasks
app.get("/task", async (req, res) => {
  const tasks = await TaskModel.find().sort({Order : 1})
  tasks.forEach((e, index) => {
    console.log(e, index);
  });
  res.json(tasks);
});

//Return : Task which matches id
app.get("/taskById/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId (req.params.id);
  const taskById = await TaskModel.findById(id)
  res.json(taskById);
});

//Return : Task which matches id
app.get("/taskById/:cardId", async (req, res) => {
  const cardId = new mongoose.Types.ObjectId (req.params.cardId);
  const tasksByCardId = await TaskModel.find({CardId : cardId})
  res.json(tasksByCardId);
});

//Return : all tasks with new one added
app.post("/task", async (req, res) => {
  const { task, cardId, isDone, assignee, createdBy, modifiedBy} = req.body;
  const taskByCard = await TaskModel.find({CardId : cardId})
  const order = taskByCard.length + 1;
  await TaskModel.create({
    Task: task,
    CardId: cardId,
    isDone: isDone,
    Assignee: assignee,
    CreatedBy: createdBy,
    ModifiedBy: modifiedBy,
    Order : order
  })

  const tasks = await TaskModel.find().sort({Order : 1})
  res.status(201).json(tasks);
});

//Return : all cards with new one
app.post("/card", async (req, res) => {
  const { cardName , createdBy} = req.body;

  await CardModel.create({
    CardName : cardName,
    CreatedBy : createdBy
  })
  const cards = await CardModel.find();
  res.status(201).json(cards);
});

//Return : all tasks by deleting one
app.delete("/task/:id", async (req, res) => {
  const id = new mongoose.Types.ObjectId (req.params.id);
  await TaskModel.deleteOne({_id : id}) 
  const tasks = await TaskModel.find();
  res.status(200).json(tasks);
});

//Return : all cards by deleting one
app.delete("/card/:cardId", async (req, res) => {
  const cardId = new mongoose.Types.ObjectId (req.params.cardId);
  await TaskModel.deleteMany( {CardId : cardId});
  await CardModel.deleteOne( {_id : cardId})
  const tasks = await TaskModel.find();
  const cards = await CardModel.find();
  res.json({cards, tasks});
});

//Return : Updated Task
app.put("/task", async (req, res) => {
  const { id, task, cardId, isDone, assignee, modifiedBy } = req.body;

  if(id === "0"){
    res.status(200).send("it is a new task");
    return;
  }
  
  await TaskModel.updateOne({_id : id}, {
    Task : task,
    CardId : cardId,
    isDone : isDone,
    Assignee : assignee,
    ModifiedBy : modifiedBy
  })
  const editedTask = await TaskModel.findById({_id : id})
  res.status(200).json(editedTask);
});

//Return : updated task
app.put("/reposition", async (req, res) => {
  const { id, cardId, modifiedBy } = req.body;
  const tasksByCard = await TaskModel.find({CardId : cardId}).sort({Order : 1});
  await TaskModel.updateOne({_id : id}, {
    CardId : cardId,
    ModifiedBy : modifiedBy,
    Order : tasksByCard.length + 1
  })
  const tasks = await TaskModel.find().sort({Order : 1});
  res.status(200).json(tasks);
});

app.put("/reorder", async (req, res) => {
  const droppedId  : mongoose.Types.ObjectId = req.body.droppedId;
  const droppedOnId : mongoose.Types.ObjectId = req.body.droppedOnId;
 
  const droppedOnTask = await TaskModel.findById(droppedOnId);
  
  if (!droppedOnTask) {
    // If the task is not found, return a 404 error
    res.status(404).json({ message: `Task with id ${droppedOnId} not found.` });
    return;
  }

  const cardId = droppedOnTask?.CardId;
  const order = droppedOnTask?.Order;
  
    // 1) Shift everything at or after insertOrder up by 1
    await TaskModel.updateMany(
      { Order: { $gte: order } },
      { $inc: { Order: 1 } }
    );
  
    // 2) Give the dragged task the new slot
    await TaskModel.updateOne(
      { _id: droppedId },
      { CardId : cardId, Order: order }
    );
  

  await TaskModel.updateOne({_id : droppedOnId}, {
    Order : order + 1
  })

  const tasks = await TaskModel.find().sort({Order : 1})
  
  res.status(200).json(tasks);
});

//Return : all cards
app.get("/card", async (req, res) => {
  const cards = await CardModel.find();
  res.json(cards);
});

//Return : updated card
app.put("/card", async (req, res) => {
  const { cardId, cardName } = req.body;

  const updatedCard = await CardModel.updateOne({_id : cardId}, {
    CardName : cardName,
  })
  res.status(200).json(updatedCard);
});

app.listen(PORT, () => {
  console.log(`task manager app's backend is listening to PORT ${PORT}`);
});
