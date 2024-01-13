const { todo } = require('./db/schema');
const { createTodo, updateTodo }= require('./types') ;

const cors = require('cors');
const express = require('express');
const app = express();


app.use(cors());
app.use(express.json());

app.post('/todo', async (req, res)=>{
  const createPayLoad = req.body;
  const parsePayload = createTodo.safeParse(createPayLoad);

  if (!parsePayload.success){
    res.status(411).json({
      msg: "You sent the wrong input",
    })
    return;
  }

  // put it in mongo
  await todo.create({
    title: createPayLoad.title,
    description: createPayLoad.description,
    completed: false
  })

  res.json({
    msg: "Todo Created"
  })

});

app.get('/todos', async (req,res)=>{
  const todos = await todo.find({});
  res.status(200).json({
    todos: todos
  })
});

app.put('/completed', async (req, res)=> {
  const updatePayLoad = req.body;
  const parsedPayLoad = updateTodo.safeParse(updatePayLoad);
  if (!parsedPayLoad.success){
    res.status(411).json({
      msg: "You sent the wrong input",
    })
    return;
  }

  await todo.updateMany({
    _id: req.body.id,
  },{
    completed: true
  });

  res.status(200).json({
    msg: "Todo marked as completed"
  })
});

app.listen(3000);