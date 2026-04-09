const { DataTypes } = require('sequelize');
const db = require('../db/conn');

const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    required: true
  },
  occupation: {
    type: DataTypes.STRING,
    required: true
  },
  enabledNewsletter: {
    type: DataTypes.BOOLEAN,
  }
});

module.exports = User;