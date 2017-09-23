const db = require('../index');
const Sequelize = db.Sequelize;

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

module.exports = Student;

