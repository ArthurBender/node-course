const Thought  = require('../models/Thought');
const User = require('../models/User');
const { Op } = require('sequelize');

const ThoughtsController = class {
  static async listThoughts(req, res) {
    let search = '';
    if (req.query.search) {
      search = req.query.search;
    }

    let order = 'DESC';
    if (req.query.order === 'old') {
      order = 'ASC';
    }

    const thoughtsData = await Thought.findAll({
      include: User,
      where: {title: {[Op.like]: `%${search}%`}},
      order: [['createdAt', order]]
    });

    const thoughts = thoughtsData.map(thought => thought.get({plain: true}));
    const thoughtsCount = thoughts.length;

    res.render('thoughts/index', { thoughts, search, thoughtsCount, emptyThoughts: thoughtsCount === 0 });
  }

  static async dashboard(req, res) {
    const user = await User.findByPk(req.session.userId, {
      include: Thought,
      plain: true
    });

    if (!user) {
      req.session.destroy();
      req.flash('error', 'User not found.');
      req.session.save(() => {
        res.redirect('/login');
      });
      return;
    }

    const thoughts = user.Thoughts.map(thought => thought.dataValues);

    res.render('thoughts/dashboard', { thoughts, emptyThoughts: thoughts.length === 0 });
  }

  static newThought(req, res) {
    res.render('thoughts/new');
  }

  static async createThought(req, res) {
    const thought = {
      title: req.body.title,
      UserId: req.session.userId
    }

    try {
      await Thought.create(thought);

      req.flash('message', 'Thought created successfully.');
      req.session.save(() => {
        res.redirect('/thoughts/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async editThought(req, res) {
    const thought = await Thought.findOne({ where: { id: req.params.id, UserId: req.session.userId }, raw: true });

    if (!thought) {
      req.flash('error', 'Thought not found.');
      req.session.save(() => {
        res.redirect('/thoughts/dashboard');
      });
      return;
    }

    res.render('thoughts/edit', { thought });
  }

  static async updateThought(req, res) {
    try {
      await Thought.update({title: req.body.title}, { where: { id: req.params.id, UserId: req.session.userId } });
      req.flash('message', 'Thought updated successfully.');
      req.session.save(() => {
        res.redirect('/thoughts/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteThought(req, res) {
    try {
      await Thought.destroy({ where: { id: req.params.id, UserId: req.session.userId } });
      req.flash('message', 'Thought deleted successfully.');
      req.session.save(() => {
        res.redirect('/thoughts/dashboard');
      });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = ThoughtsController;