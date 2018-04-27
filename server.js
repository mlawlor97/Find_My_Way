const express = require('express');

const app = express();
const port = process.env.PORT || 5050;

var floorplans = {images: []};

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

app.listen(port, () => console.log(`Listening on port ${port}`));
