//imports
const router = require('express').Router();
const controllers = require('../controllers');
const authRequired = require('../middleware/authRequired');

//routes
router.get('/',authRequired,controllers.users.show);
router.put('/:id',authRequired,controllers.users.update);
router.delete('/:id',authRequired,controllers.users.destroy);

module.exports = router