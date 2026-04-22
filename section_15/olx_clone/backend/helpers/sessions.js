const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "FVAc5f4iqYiLEe1N80rlUpnaiqbO+J9iFF154FspLlw=";

function generateAccessToken(user) {
  return jwt.sign({ name: user.name, id: user._id }, JWT_SECRET, { expiresIn: "1d" });
}

function verifyAuthorization(req, res, next) {
  let accessToken = null;
  if (req.headers.authorization) {
    accessToken = parseAuthorization(req.headers.authorization);
  }
  
  if (accessToken && accessToken.id && accessToken.name) {
    req.user = { name: accessToken.name, id: accessToken.id };

    next();
  } else {
    res.status(403).json({ status: "error", message: "You need to be logged in to perform this action." });
  }
}

function parseAuthorization(authHeader) {
  const token = authHeader.split(" ")[1];

  try {
    const parsedToken = jwt.verify(token, JWT_SECRET);

    return parsedToken;
  } catch (err) {
    return null;
  }
}

module.exports = { generateAccessToken, verifyAuthorization, parseAuthorization };