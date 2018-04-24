const express = require('express');

const app = express();
const port = process.env.PORT || 5050;

app.post('/api/maps', (req, res) => {
  console.log(req.route);
  var car = {type: 'a good one', model: 'T', color: 'red'};
  res.send(car);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
