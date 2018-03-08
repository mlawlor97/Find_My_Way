var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



router.post('/api/login', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var email = "mlawlor@iastate.edu";
    var password = "password";

    if(req.body.password === password && req.body.email === email){
      res.json({message: "you are logged in"});
    } else {
        res.status(204).json({id: 204, error:err.message});
    }

});

module.exports = router;
