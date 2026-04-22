const User = require("../models/User");

const bcrypt = require("bcrypt");

const { checkRequiredFields, renderError, renderSuccess } = require("../helpers/requests");
const { findUser, canUpdate, clearFields } = require("../helpers/resources");

const usersController = class {
  static async show(req, res) {
    const user = await findUser(req.params.id);

    if (user) {
      return renderSuccess(res, 200, { data: user });
    } else {
      return renderError(res, 404, "User not found.");
    }
  }

  static async create(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body || {};

    const userData = { name, email, phone, password, confirmPassword };

    // Validations
    let missingFields = checkRequiredFields(userData, ["name", "email", "phone", "password", "confirmPassword"]);
    if (missingFields.length > 0) {
      return renderError(res, 400, "Couldn't create user. Missing fields: " + missingFields.join(", "));
    }

    if (password !== confirmPassword) {
      return renderError(res, 400, "Couldn't create user. Passwords don't match.");
    }

    const existingUser = await User.findOne({$or: [{ email }, { phone }]});
    if (existingUser && existingUser.email === email) {
      return renderError(res, 400, "Couldn't create user. Email already exists.");
    } else if (existingUser && existingUser.phone === phone) {
      return renderError(res, 400, "Couldn't create user. Phone number already exists.");
    }

    // Password encryption
    const salt = await bcrypt.genSalt(12);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, phone, encryptedPassword })
    try {
      const createdUser = await user.save();
      return renderSuccess(res, 201, { message: "User created successfully. You can now sign in.", data: createdUser });
    } catch (err) {
      return renderError(res, 500, `Couldn't create user. Error: ${err.message}`);
    }
  }

  static async update(req, res) {
    const { name, email, phone, password, confirmPassword } = req.body || {};

    let avatarPath = null;
    if (req.file) {
      avatarPath = req.file.filename;
    }

    const user = await findUser(req.params.id);
    if (!user) {
      return renderError(res, 404, "User not found.");
    }

    // Ability
    if (!canUpdate(req, res, user, "user")) return;

    // Validations
    if ((email && email != user.email) || (phone && phone != user.phone)) {
      const existingUser = await User.findOne({
        $or: [{ email }, { phone }],
        _id: { $ne: user._id }
      });

      if (existingUser && existingUser.email === email) {
        return renderError(res, 400, "Couldn't update user. New email already exists.");
      } else if (existingUser && existingUser.phone === phone) {
        return renderError(res, 400, "Couldn't update user. New phone number already exists.");
      }
    }

    let encryptedPassword = null;
    if (password) {
      if (password !== confirmPassword) {
        return renderError(res, 400, "Couldn't update user. Passwords don't match.");
      }

      // Password encryption
      const salt = await bcrypt.genSalt(12);
      encryptedPassword = await bcrypt.hash(password, salt);
    }

    const userData = clearFields({ name, email, phone, encryptedPassword, avatarPath });

    try {
      const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { $set: userData }, { returnDocument: "after" });

      return renderSuccess(res, 200, { message: "User updated successfully.", data: updatedUser });
    } catch (err) {
      return renderError(res, 500, `Couldn't update user. Error: ${err.message}`);
    }
  }
}

module.exports = usersController;
