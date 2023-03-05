var express = require('express');
var router = express.Router();
var kittyController = require('../controllers/kitty');

router.get('/', kittyController.kitty_list);
router.get('/create', kittyController.kitty_create_get);
router.post('/create', kittyController.kitty_create_post);


module.exports = router;