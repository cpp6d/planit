var express = require('express');
var authController = require('../controllers').authController;
var authRouter = express.Router();

authRouter.get('/#/trip/:hash', authController.GETHASH);
authRouter.post('/signin', authController.SIGNIN);
authRouter.post('/signup', authController.SIGNUP);
authRouter.get('/', authController.GET);


module.exports = authRouter;
