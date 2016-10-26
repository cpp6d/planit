// Connect to database
var db = require('./db.js');

// Set table schema
var PossibleActivities = require('../models').PossibleActivities(db);
var SavedActivities = require('../models').SavedActivities(db);
var PossibleExpedia = require('../models').PossibleExpedia(db);
var SavedExpedia = require('../models/').SavedExpedia(db);
var Trip = require('../models').Trip(db);
var Users = require('../models').Users(db);

// Assign table relationships
PossibleActivities.belongsTo(Trip);
SavedActivities.belongsTo(Trip);
PossibleExpedia.belongsTo(Trip);
SavedExpedia.belongsTo(Trip);

Trip.hasMany(PossibleActivities, {foreignKey: 'PossibleActivitiesId', constraints: false});
Trip.hasMany(PossibleExpedia, {foreignKey: 'PossibleExpediaId', constraints: false});
Trip.hasMany(SavedActivities, {foreignKey: 'SavedActivitiesId', constraints: false});
Trip.hasMany(SavedExpedia, {foreignKey: 'SavedExpediaId', constraints: false});

// Option {force: true} overwrites existing tables.
db.sync();

module.exports = {
  db: db,
  PossibleActivities: PossibleActivities,
  SavedActivities: SavedActivities,
  PossibleExpedia: PossibleExpedia,
  SavedExpedia: SavedExpedia,
  Trip: Trip,
  Users: Users
};
