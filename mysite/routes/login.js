var express = require("express");
var router = express.Router();
const usersBL = require("../models/movieManageBL.js");
const loginBL = require("../models/loginBL");
const readFileDal = require("../DALs/FileUsersDal");

/* GET users listing. */
router.get("/", function (req, res, next) {

  req.session.destroy();
  res.render("login", {});
});

//menu page

router.post("/menu", async function (req, res, next) {
  try{
  let ans = false;
  let data = req.body;
  let stat = await loginBL.authCheck(data);
  if (stat) {
    let sess = req.session;
    if (!sess.username ) {
      sess.username = data.username;
      sess.pass = data.pass;
      sess.view = 0
    }
    
    
    res.redirect("/menu");
  } else {
    res.redirect("/");
  }
}
catch(err){
  console.log(err)
}
}
);

module.exports = router;
