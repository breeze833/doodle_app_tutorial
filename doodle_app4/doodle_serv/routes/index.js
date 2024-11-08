var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/showcase', (req, res, next)=>{
  res.render('showcase');
});

module.exports = router;
