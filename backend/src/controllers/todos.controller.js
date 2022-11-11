const Todo = require("../models/todoModel");
const User = require("../models/userModel");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: "Не могу найти задачи" });
  }
};

const addTodos = async (req, res) => {
  const bodyData = req.body.todo;
  if (!bodyData) {
    res.status(400).json({ message: "Неправильные данные" });
  }
  try {
    const todo = await Todo.create({
      todo: bodyData,
      user: req.user.id,
    });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ message: "Неправильные данные" });
  }
};

const updateTodos = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(400).json({ message: "Идентификатор задачи не существует" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "Пользователь не существует" });
    }
    if (todo.user.toString() !== user.id) {
      res.status(401).json({ message: "Пользователь не авторизован" });
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTodo); 
  } catch (error) {
    res.status(404).json({ message: "Не могу обновить список дел" });
  }
};

const deleteTodos = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      res.status(400).json({ message: "Идентификатор задачи не существует" });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401).json({ message: "Пользователь не существует" });
    }
    if (todo.user.toString() !== user.id) {
      res.status(401).json({ message: "Пользователь не авторизован" });
    }
    await todo.remove();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    req.status(404).json({ message: "Не могу удалить задачи" });
  }
};

module.exports = {
  getTodos,
  addTodos,
  updateTodos,
  deleteTodos,
};