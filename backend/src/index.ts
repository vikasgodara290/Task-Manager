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

//Return : All tasks
app.get("/task", async (req, res) => {
  const tasks = await TaskModel.find()
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

//Return : all tasks with new one added
app.post("/task", async (req, res) => {
  const { task, cardId, isDone, assignee, createdBy, modifiedBy} = req.body;

  await TaskModel.create({
    Task: task,
    CardId: cardId,
    isDone: isDone,
    Assignee: assignee,
    CreatedBy: createdBy,
    ModifiedBy: modifiedBy,
  })

  const tasks = await TaskModel.find()
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

  await TaskModel.updateOne({_id : id}, {
    CardId : cardId,
    ModifiedBy : modifiedBy
  })
  const tasks = await TaskModel.find();
  res.status(200).json(tasks);
});

app.put("/reorder", async (req, res) => {
  const droppedId  : mongoose.Types.ObjectId = req.body.droppedId;
  const droppedOnId : mongoose.Types.ObjectId = req.body.droppedOnId;

  const tasks = await TaskModel.find() 
 
  const taskDroppedOnIndex = tasks.findIndex((task) => task._id.equals( droppedOnId ));
  const taskDroppedIndex = tasks.findIndex((task) => task._id.equals( droppedId ));
  
  if (taskDroppedOnIndex === -1) {
    // If the task is not found, return a 404 error
    res.status(404).json({ message: `Task with id ${droppedOnId} not found.` });
    return;
  }

  const droppedOnTask = await TaskModel.findOne({_id : droppedOnId})
  const cardId = droppedOnTask?.CardId;

  // Update the task properties
  await TaskModel.updateOne({_id : droppedId}, {
    CardId : cardId
  })

  const [item] = tasks.splice(taskDroppedIndex, 1);
  tasks.splice(taskDroppedOnIndex , 0, item);
  
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
