const User = require('../models/User');
const bycript = require('bcryptjs');

const AuthController = class {
  static login(req, res) {
    res.render('auth/login');
  }

  static signup(req, res) {
    res.render('auth/signup');
  }

  static async createAccount(req, res) {
    const { name, email, password, confirmPassword } = req.body;
    
    let error;
    if (password.length < 8) {
      error = "Password must be at least 8 characters long.";
    } else if (password !== confirmPassword) {
      error = "Passwords do not match, try again.";
    } else if (await User.findOne({ where: { email } })) {
      error = "User already exists, try another email.";
    }

    if (error) {
      req.flash('error', error);
      req.session.save(() => {
        res.redirect('/signup');
      });
      return;
    }

    const salt = bycript.genSaltSync(10);
    const hashPassword = bycript.hashSync(password, salt);

    try {
      const user = await User.create({ name, email, password: hashPassword });

      req.flash('message', 'User created successfully. You are now logged in.');

      req.session.userId = user.id;
      req.session.save(() => {
        res.redirect('/');
      });

    } catch (error) {
      console.error(error);
    }
  }

  static async createSession(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    let error;
    if (!user) {
      error = "User not found, try again.";
    } else if (!bycript.compareSync(password, user.password)) {
      error = "Incorrect password, try again.";
    }

    if (error) {
      req.flash('error', error);
      req.session.save(() => {
        res.redirect('/login');
      });
      return;
    }

    req.session.userId = user.id;
    req.flash('message', "Successfully logged in.");
    req.session.save(() => {
      res.redirect('/');
    });
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
}

module.exports = AuthController;
