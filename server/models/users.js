var Sequelize = require('sequelize');

module.exports = function(db) {
  var Users = db.define('users', {
    name: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
  });

  return Users;
};
