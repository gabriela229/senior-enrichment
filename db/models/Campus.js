const db = require('../index');
const Sequelize = db.Sequelize;

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    },
    allowNull: false
  }
});

module.exports = Campus;
