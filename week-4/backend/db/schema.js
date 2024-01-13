const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dalmiac:dalmiacMongoDB1@dalmiac.yiceciq.mongodb.net/01-todoApp');

const todo = mongoose.model('todo',
{
  title: String,
  description: String,
  completed: Boolean
});

module.exports = {
  todo: todo,
}