const express = require('express');
const router = express.Router();
const imageRouter = require('./image');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('form');
});

router.use('/image', imageRouter);

module.exports = router;
