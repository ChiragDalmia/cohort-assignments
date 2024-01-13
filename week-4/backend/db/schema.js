const mongoose = require('mongoose');

mongoose.connect('your-mongo-url-here');

const todo = mongoose.model('todo',
{
  title: String,
  description: String,
  completed: Boolean
});

module.exports = {
  todo: todo,
}