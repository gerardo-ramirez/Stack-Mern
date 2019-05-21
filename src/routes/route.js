const express = require('express');
const router = express.Router();
//require models
const Task = require('../models/task.model');

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks)
});

//buscar un solo id:
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.json(task);


});

router.post('/add', async (req, res) => {

    const task = new Task(req.body);
    await task.save();
    res.json({ status: "add task" })
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newTask = req.body;
    await Task.findByIdAndUpdate(id, newTask);
    res.json({ status: "update task" })
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndRemove(id);
    res.json({ status: "deleted task" })
});

module.exports = router;