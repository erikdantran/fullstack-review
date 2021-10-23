const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/fetcher', { useUnifiedTopology: true, useNewUrlParser: true }, () => { console.log("connected to DB") });

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: { type: String, unique: true },
  owner: String,
  forks: Number,
  url: String
});

// third argument might be needed (collection name)
let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  let results = [];
  for (repo of repos) {
    let obj = {
      name: repo.name,
      forks: repo.forks_count,
      owner: repo.owner.login,
      url: repo.html_url
    };
    results.push(obj);
  }

  return Repo.insertMany(results)
    .then((result) => {
      return 'Successful'
    })
    .catch((err) => {
      return err;
    })
}

let getAll = () => {
  return Repo.find()
    .then((results) => {
      return results;
    })
    .catch((err) => {
      return err;
    })
}

module.exports.save = save;
module.exports.getAll = getAll;