var PossibleActivities = require('../models/possibleActivities');
var PossibleExpedia = require('../models/possibleExpedia');
var SavedActivities = require('../models/savedActivities');
var SavedExpedia = require('../models/savedExpedia');
var Trip = require('../models/trip');
var Users = require('./users');

module.exports = {
  PossibleActivities: PossibleActivities,
  PossibleExpedia: PossibleExpedia,
  SavedActivities: SavedActivities,
  SavedExpedia: SavedExpedia,
  Trip: Trip,
  Users: Users
};
