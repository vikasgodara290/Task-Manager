import express from 'express';
import cors from 'cors';
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
let Tasks = [
    {
        id: 1,
        Desc: "Go To Gym",
        Status: "Todo",
        Assignee: 111,
        CreatedOn: "07-Apr-2025 6:00 PM",
        CreatedBy: 100,
        ModifiedOn: "",
        ModifiedBy: 0
    },
    {
        id: 2,
        Desc: "Complete Project Report",
        Status: "Doing",
        Assignee: 112,
        CreatedOn: "06-Apr-2025 10:00 AM",
        CreatedBy: 100,
        ModifiedOn: "07-Apr-2025 9:00 AM",
        ModifiedBy: 112
    },
    {
        id: 3,
        Desc: "Prepare Presentation",
        Status: "Done",
        Assignee: 113,
        CreatedOn: "05-Apr-2025 2:00 PM",
        CreatedBy: 100,
        ModifiedOn: "06-Apr-2025 4:00 PM",
        ModifiedBy: 113
    }
];

let Users = [
    {
        id: 100,
        name: "Admin",
        role: "Administrator"
    },
    {
        id: 111,
        name: "Ajay",
        role: "Developer"
    },
    {
        id: 112,
        name: "Vikas",
        role: "Project Manager"
    },
    {
        id: 113,
        name: "Rohit",
        role: "Designer"
    }
];

app.get('/task', (req, res)=>{
    res.json(Tasks)
});

app.get('/taskById', (req, res)=>{
    const id = req.body.id;
    res.json(Tasks.filter(tasks => tasks.id == id))
})

app.post('/task', (req, res)=>{
    const id = Tasks.length + 1;
    const {desc, status, assignee, createdBy} = req.body;

    // Create a new task object
    const newTask = {
        id,
        Desc: desc,
        Status: status || "Todo", // Default status to "Todo" if not provided
        Assignee: assignee,
        CreatedOn: new Date().toLocaleString(), // Set current date and time
        CreatedBy: createdBy,
        ModifiedOn: "",
        ModifiedBy: 0
    };

    Tasks.push(newTask);
    res.status(201).json(newTask);
});

//delete a task
app.delete('/task/:id', (req, res)=>{
    const id = parseInt(req.params.id, 10);
    Tasks = Tasks.filter(task => task.id !== id);
    res.status(200).json({ message: `Task with id ${id} deleted successfully.` });
})

//edit a task
app.put('/task', (req, res) => {
    // Extract data from the request body
    const { id, desc, status, assignee, modifiedBy } = req.body; 
    // Find the task by ID
    const taskIndex = Tasks.findIndex(task => task.id === parseInt(id, 10));

    if (taskIndex === -1) {
        // If the task is not found, return a 404 error
        res.status(404).json({ message: `Task with id ${id} not found.` });
        return;
    }

    // Update the task properties
    Tasks[taskIndex] = {
        ...Tasks[taskIndex], // Keep existing properties
        Desc: desc || Tasks[taskIndex].Desc, // Update only if provided
        Status: status || Tasks[taskIndex].Status,
        Assignee: assignee || Tasks[taskIndex].Assignee,
        ModifiedOn: new Date().toLocaleString(), // Set the current date and time
        ModifiedBy: modifiedBy || Tasks[taskIndex].ModifiedBy
    };

    // Respond with the updated task
    res.status(200).json(Tasks[taskIndex]);
})

app.listen(PORT, ()=>{
    console.log(`task manager app's backend is listening to PORT ${PORT}`);
});


