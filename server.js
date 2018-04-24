const express = require('express');

const app = express();
const port = process.env.PORT || 5050;

app.get('/api/hello', (req, res) => {
  console.log(req);
  res.send({ express: 'Hello From Express' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
