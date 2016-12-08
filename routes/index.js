var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let cookie = cookies.get('id');
  if(cookie){
    res.redirect('/blobs/' + cookie);
  }
  else res.render('index', { title: 'Qustionnaire' });
});

module.exports = router;
