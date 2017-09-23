const db = require('../index');
const Sequelize = db.Sequelize;

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true
    }
  }
});

module.exports = Campus;
