const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
const mongoose = require("mongoose")

const app = express();

app.use(express.json())
app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }))

// Connect to DB
const DB_PASSWORD = 'Awabsaghir4231';
const DB_CONNECT_STATEMENT = `mongodb+srv://awabsaghir:${DB_PASSWORD}@todolistcluster.u0tkcnw.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(DB_CONNECT_STATEMENT);

const todoSchema = mongoose.Schema({
  text: { type: String, requrired: true },
  isChecked: { type: Boolean, default: false }
})

const Todo = mongoose.model('Todo', todoSchema);

// GET - todo data

app.get('/todos', (req, res) => {
  Todo.find().then((todosData)=> res.json(todosData))
});

// POST - todo
// required json - {Text-string}

app.post("/todos/create", async (req, res) => {
  await Todo.create({text: req.body.text})
  Todo.find().then((todosData)=> res.json(todosData))
})

// PATCH - updating "isChecked" if checked is clicked
// required json - {id-int}

app.patch("/todos/update", async (req, res)=> {
  let id = req.body.id
  console.log(id, req.body)
  try {
    doc = await Todo.findById({_id : id}).exec()
    doc.isChecked = !doc.isChecked
    await doc.save()
    Todo.find().then((todosData)=> res.json(todosData))
  } catch(error) {
    console.log("ERROR: ", error)
  }
})

// DELETE - deleteing todo with given id
// required json - {id-int}

app.post("/todos/delete", async(req, res) => {
  id = req.body.id
  await Todo.findByIdAndDelete(id)
  Todo.find().then((todosData)=> res.json(todosData))
})

app.listen(4000, () => console.log('Example app is listening on port 4000.'));