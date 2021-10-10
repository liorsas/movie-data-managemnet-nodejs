const jFile = require("jsonfile");

function getDataFromUsesrsJs() {
  return new Promise((resolve, reject) => {
    jFile.readFile(__dirname + "/Users.json", function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {getDataFromUsesrsJs}