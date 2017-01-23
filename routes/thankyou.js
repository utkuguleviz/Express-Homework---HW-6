var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('thankyou', {fullname: req.session.fullname});
});

module.exports = router;