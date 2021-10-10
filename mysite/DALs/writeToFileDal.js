const jFile = require("jsonfile");

function saveToFile(obj) {
  return new Promise((resolve, reject) => {
    jFile.writeFile(__dirname +  "/NewMovies.json", obj, function (err) {
      if (err) {
        reject(err);
      } else resolve("succeded");
    });
  });
}

module.exports = {saveToFile}