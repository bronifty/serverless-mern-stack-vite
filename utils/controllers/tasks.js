require('dotenv').config();
const uri = process.env.MONGO_URI;
const { connectDb, closeDb } = require('../db/connect');
const Task = require('../models/Task');
const getAllTasks = async (req, res) => {
  console.log('does this thing work?');
  try {
    await connectDb(uri);
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    await closeDb();
  }
};

const createTask = async (req, res) => {
  try {
    await connectDb(uri);
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    await closeDb();
  }
};
const getTask = async (req, res) => {
  try {
    await connectDb(uri);
    const task = await Task.findOne({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id ${req.params.id} found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    await closeDb();
  }
};
const deleteTask = async (req, res) => {
  try {
    await connectDb(uri);
    const task = await Task.findOneAndDelete({ _id: req.params.id });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id ${req.params.id} found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    await closeDb();
  }
};
const updateTask = async (req, res) => {
  try {
    await connectDb(uri);
    const task = await Task.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res
        .status(404)
        .json({ msg: `No task with id ${req.params.id} found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  } finally {
    await closeDb();
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
