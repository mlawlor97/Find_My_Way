const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
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
  res.send({message: 'You''ve found they way!'});
});

app.post('/api/getFloorplans', (req, res) => {
  var user = {
    email: req.body.email,
  };

  connection.query("SELECT jsonData FROM Images WHERE email='"+user.email+"'"){

  }
});

app.post('/api/updateFloorplans', (req, res) => {
  var toUpdate = {
    email: req.body.email,
    floorplans: req.body.floorplans,
  };

  connection.query("Insert into Images values ('"+toUpdate.email"', '" + toUpdate.floorplans + "')"){
    // TODO
	INSERT INTO table_name
VALUES (value1, value2, value3, ...);
  });
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
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
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
