const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node_sequelize', 'root', 'mysql', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Database connection has been established successfully.');
} catch (err) {
  console.error("Unable to connect to the database: ", err);
}

module.exports = sequelize;