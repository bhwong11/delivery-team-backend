//imports
const router = require('express').Router();
const controllers = require('../controllers');

//routes
router.post('/register',controllers.auth.register);
router.post('/login',controllers.auth.login);

module.exports = router