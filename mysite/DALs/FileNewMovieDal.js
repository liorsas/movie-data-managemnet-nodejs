const jFile = require("jsonfile");

function getDataNewMovie() {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/NewMovies.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {getDataNewMovie}