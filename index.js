const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')

const app = express();

app.use(cors()) 
app.use(bodyParser.urlencoded({ extended: false }))

let todoListData = [
  {
    id: 53, 
    text: "do your dishes",
    isChecked: false,
  },
  {
    id: 63, 
    text: "go to the gym",
    isChecked: false
  },
  {
    id: 82, 
    text: "do your chores",
    isChecked: false
  },
  {
    id: 92, 
    text: "go to college",
    isChecked: false
  }
]

// GET - todo data

app.get('/todos', (req, res) => {
  res.json(todoListData);
});

// POST - todo
// required json - {Text-string}

app.post("/todos/create", (req, res) => {
  console.log(req.body)
  let newTodo = {
    id: Math.floor(Math.random() * 100001),
    text: req.body.text, 
    isChecked: false
  } 
  todoListData.push(newTodo)
  res.json(todoListData)
})

// PATCH - updating "isChecked" if checked is clicked
// required json - {id-int}

app.patch("/todos/update", (req, res)=> {
  let id = req.body.id
  console.log(id, req.body)
  todoListData.forEach((todo, index) => {
    todo.id == id && (todo.isChecked = !todo.isChecked)
  });
  res.json(todoListData)
  console.log(todoListData)

})

// DELETE - deleteing todo with given id
// required json - {id-int}

app.delete("/todos/delete", (req, res) => {
  id = req.body.id

  todoListData.forEach((todo, index) => todo.id == id && todoListData.splice(index, 1) )
  res.json(todoListData)

})

app.listen(4000, () => console.log('Example app is listening on port 4000.'));