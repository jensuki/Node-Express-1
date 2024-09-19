const express = require('express');
let axios = require('axios');
var app = express();

// add json parsing middleware
app.use(express.json());

app.post('/', async function (req, res, next) {
  try {
    // use Promise.all()
    let results = await Promise.all(req.body.developers.map(async d => {
      return axios.get(`https://api.github.com/users/${d}`);
    }));

    // map results to get name and bio
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));
    return res.json(out); // send json response
  } catch (err) {
    next(err); // pass err to error handler
  }
});

app.listen(3000, function () {
  console.log('Server running on port 3000');
});
