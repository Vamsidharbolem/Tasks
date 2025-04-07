require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Todo Schema & Model
const TodoSchema = new mongoose.Schema({ task: String });
const Todo = mongoose.model("Todo", TodoSchema);

// Routes
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

app.post("/todos", async (req, res) => {
    const newTodo = new Todo({ task: req.body.task });
    await newTodo.save();
    res.json(newTodo);
});

app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
