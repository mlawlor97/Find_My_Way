const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const port = process.env.PORT || 5050;

var floorplans = {images: []};

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'FeyenDMaiWey!1969',
  database: 'findmyway'
});
connection.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

app.get('/api/test', (req, res) => {
  res.send({message: 'You have found they way!'});
});

app.post('/api/getFloorplans', (req, res) => {
  var user = {
    email: req.body.email,
  };
console.log(user.email);
  connection.query("SELECT jsonData FROM Images WHERE email='"+user.email+"'", function(error, results, fields){
    if(error){
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      console.log(results[0].jsonData);
      console.log("GETTING");
      res.send({
        "code": 200,
        "success": results[0].jsonData,
      });
    }
  })
});

app.post('/api/updateFloorplans', (req, res) => {
  var toUpdate = {
    email: req.body.email,
    floorplans: req.body.floorplans,
  };

  connection.query("UPDATE Images SET jsonData='"+ toUpdate.floorplans +"' WHERE email='" + toUpdate.email + "'", function(error, results, fields){
    if(error){
      console.log("FAILED UPDATE");
      res.send({
        "code": 400,
        "failed": "error ocurred"
      });
    } else {
      console.log(toUpdate.floorplans);
      console.log(toUpdate.email);
      console.log("SUCCESSFUL UPDATE");
      res.send({
        "code": 200,
        "success": "Images updated correctly"
      });
    }
  })
});



app.post('/api/register', (req, res) => {
  var today = new Date();
  var users = {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "password": req.body.password,
    "created": today,
    "modified": today
  }
  connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
    if (error) {
      console.log("Insert Users Failure");
    } else {
      console.log("Insert Users Success");
    }
  });

  imageData = {
    "email": users.email,
    "jsonData": JSON.stringify({images: []}),
  }

  connection.query('INSERT INTO Images SET ?', imageData, function (error, results, fields) {
    if (error) {
      console.log("Insert IMAGES Failure");
    } else {
      console.log("Insert IMAGES Success");
    }
  });


});

app.post('/api/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      if (results.length > 0) {
        if (results[0].password == password) {
          res.send({
            "code": 200,
            "success": "login sucessfull"
          });
        }
        else {
          res.send({
            "code": 204,
            "success": "Email and password does not match"
          });
        }
      }
      else {
        res.send({
          "code": 204,
          "success": "Email does not exits"
        });
      }
    }
  });

});

app.listen(port, () => console.log(`Listening on port ${port}`));
