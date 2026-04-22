const User = require("../models/User");

const bcrypt = require("bcrypt");

const { checkRequiredFields, renderError, renderSuccess } = require("../helpers/requests");
const { generateAccessToken, parseAuthorization } = require("../helpers/sessions");
const { findUser } = require("../helpers/resources");

const sessionsController = class {
  static async create(req, res) {
    const { email, password } = req.body || {};

    const userData = { email, password };

    // Validations
    let missingFields = checkRequiredFields(userData, ["email", "password"]);
    if (missingFields.length > 0) {
      return renderError(res, 400, "Couldn't log in. Missing fields: " + missingFields.join(", "));
    }

    const user = await User.findOne({ email }).select("+encryptedPassword");
    const checkPassword = await bcrypt.compare(password, user?.encryptedPassword || "");
    if (!user || !checkPassword) {
      return renderError(res, 400, "Couldn't log in. Check your credentials.");
    }

    const accessToken = generateAccessToken(user);
    return renderSuccess(res, 200, { message: "Logged in successfully.", data: { accessToken } });
  }

  static async getCurrentUser(req, res) {
    const accessToken = parseAuthorization(req.headers.authorization);

    const user = await findUser(accessToken.id);
    if (user) {
      return renderSuccess(res, 200, { data: user });
    } else {
      return renderError(res, 403, "Invalid authorization header.");
    }
  }
}

module.exports = sessionsController;