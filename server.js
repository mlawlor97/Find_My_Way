const express = require('express');

const app = express();
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

app.post('/api/maps', (req, res) => {
  console.log(req.route);
  var car = {type: 'a good one', model: 'T', color: 'red'};
  res.send(car);
});

app.get('/api/test', (req, res) => {
  res.send({message: 'hey buddy'});
});

app.get('/api/floorplans', (req, res) => {
  res.send(floorplans);
});

app.post('/api/floorplans', (req, res) => {
  console.log(req);
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
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send({
        "code": 200,
        "success": "user registered sucessfully"
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      // console.log('The solution is: ', results);
      if (results.length > 0) {
        if ([0].password == password) {
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
