const jsFile = require("jsonfile");

function updateUserFile(obj) {
  return new Promise((resolve, reject) => {
    jsFile.writeFile(__dirname + "/Users.json", obj, function (err) {
      if (err) {
        reject(err);
      } else resolve("succeded");
    });
  });
}

module.exports = { updateUserFile };
