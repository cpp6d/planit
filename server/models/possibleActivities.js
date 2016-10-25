var Sequelize = require('sequelize');

module.exports = function(db) {
  var PossibleActivities = db.define('possibleActivities', {
    name: { type: Sequelize.STRING },
    rating: { type: Sequelize.STRING },
    stars: { type: Sequelize.STRING },
    image: { type: Sequelize.STRING },
    description: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    uuid: { type: Sequelize.STRING },
    categories: {type: Sequelize.STRING }
  });

  return PossibleActivities;
};
