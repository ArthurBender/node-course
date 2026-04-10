const Task = require('../models/Task');

module.exports = class TaskController {
  static newTask(req, res) {
    res.render('tasks/new');
  }

  static async createTask(req, res) {
    await Task.create({
      title: req.body.title,
      description: req.body.description,
      done: false
    });

    res.redirect('/tasks');
  }

  static async listTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    res.render('tasks/index', { tasks });
  }

  static async editTask(req, res) {
    const task = await Task.findOne({ where: { id: req.params.id }, raw: true });

    if (!task) {
      throw new Error('Task not found');
    }

    res.render('tasks/edit', { task });
  }

  static async updateTask(req, res) {
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: req.body.done === 'on'
    }

    await Task.update(task, { where: { id: req.params.id } });

    res.redirect('/tasks');
  }

  static async updateTaskStatus(req, res) {
    const task = {
      done: req.body.done === 'on'
    }

    await Task.update(task, { where: { id: req.params.id } });

    res.redirect('/tasks');
  }

  static async deleteTask(req, res) {
    await Task.destroy({ where: { id: req.params.id } });

    res.redirect('/tasks');
  }
};
