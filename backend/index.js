import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import connectDB from './db.js';

import Todo from './models/todo.js'

const app = express();

const port = 3000;

// allow requests from frontend
app.use(cors());

// format incoming data to json
app.use(express.json());

// GET todos
app.get('/api/todos', async (req, res) => {
    const todos = await Todo.find({});
    res.json(todos);
})

// POST create a todo
app.post('/api/todos', async (req, res) => {
    console.log(req.body);
    const todo = await Todo.create(req.body);
    res.json(todo);
})

// DELETE remove a todo
app.delete('/api/todos/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);
    console.log(result);
    res.json(result);
})

// PUT updating a todo
app.put('/api/todos/:id', async (req, res) => {
    const result = await Todo.findByIdAndUpdate(req.params.id, req.body);
    console.log(result);
    res.json(result);
});


app.listen(port, () => {
    console.log('Listening on port: ', port);
    connectDB();
})