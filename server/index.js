const express = require('express');
let app = express();
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
const db = require('../database/index.js')
let gitHelper = require('../helpers/github.js');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true})); // need to google what this does
app.use(cors());

app.use(express.static(__dirname + '/../client/dist'));


app.post('/repos', function (req, res) {
  gitHelper.getReposByUsername(req.body.term, (err, results) => {
    if (err) { throw 'Failed to post' }
    else {
      console.log(results);
      res.status(201).json('Post successful');
     }
  })
});


app.get('/repos', function (req, res) {
  return db.getAll()
    .then((results) => {
      let sorted = results.sort((a, b) => { return b.forks - a.forks }).slice(0,25)
      res.status(200).send(sorted)
    })
    .catch(err => {
      console.error(err);
      throw new Error ('Failed to get');
    })
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

