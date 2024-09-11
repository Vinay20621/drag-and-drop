const express = require("express");
const router = express.Router();
const Todo = require("../models/todo");

// Create a new todo
router.post("/create-todo", async (req, res) => {
    try {
        const userId=req?.user?.id
        const { title, description } = req.body;
        const todo = await Todo.create({ title,
            description,
            createdBy :userId
        });
        return res.json({ success: true, msg: "Added todo successfully", todo });
    } catch (error) {
        console.log({error})
        return res.json({ success: false, msg: "Server error" });
    }
});

// Get all todos
router.get("/get-all-todo", async (req, res) => {
    try {
        // Fetch todos and populate the createdBy field with user details
        const userId=req?.user?.id
        console.log(req.user)
        const todos = await Todo.find({ createdBy: userId })
        .populate('createdBy', 'firstName lastName email')  // Populate user details if needed
        .exec();

    return res.json({ success: true, todos });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, msg: "Server error" });
    }
});


// Get a single todo by ID
router.get("/get-todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({ success: false, msg: "Todo not found" });
        }
        return res.json({ success: true, todo });
    } catch (error) {
        return res.json({ success: false, msg: "Server error" });
    }
});

// Delete a todo by ID
router.delete("/delete-todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ success: false, msg: "Todo not found" });
        }
        return res.json({ success: true, msg: "Todo deleted successfully" });
    } catch (error) {
        return res.json({ success: false, msg: "Server error" });
    }
});

// Update a todo by ID
router.put("/update-todo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ success: false, msg: "Todo not found" });
        }
        return res.json({ success: true, todo: updatedTodo });
    } catch (error) {
        return res.json({ success: false, msg: "Server error" });
    }
});

router.put("/update-todo-status/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log({status})
        console.log({id})

        const updatedTodo = await Todo.findByIdAndUpdate(id, { status });
        if (!updatedTodo) {
            return res.status(404).json({ success: false, msg: "Todo not found" });
        }
        return res.json({ success: true, todo: updatedTodo });
    } catch (error) {
        return res.json({ success: false, msg: "Server error" });
    }
});

module.exports = router;

