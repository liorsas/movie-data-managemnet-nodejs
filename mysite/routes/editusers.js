var express = require("express");
var router = express.Router();
const usersBL = require("../models/movieManageBL.js");
const loginBL = require("../models/loginBL");
const userAdminBL = require("../models/userAdminBL");
const readFileDal = require("../DALs/FileUsersDal");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  try{
  let sess = req.session;

  let adminCheck = await loginBL.checkAdmin(sess);

  if (adminCheck) {
    let resp = await userAdminBL.getUsers();

    res.render("editusers", { users: resp });
  } else res.redirect("/");
}
catch(err){
  console.log(err)
}
}
);

router.get("/userdata", async function (req, res, next) {
  try{
  let update = false;
  let sess = req.session;

  let adminCheck = await loginBL.checkAdmin(sess);
  if (adminCheck) {
    res.render("userdata", { upd: update });
  } else {
    res.redirect("/");
  }
}
catch(err){
  console.log(err)
}
}
);

router.post("/del", async function (req, res, next) {
  try {
    let sess = req.session;
    let adminCheck = await loginBL.checkAdmin(sess);

    if (adminCheck) {
      let data = req.body;

      let ans = await userAdminBL.delUser(data);
      console.log(ans);

      let resp = await userAdminBL.getUsers();
      res.render("editusers", { users: resp });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/userdata", async function (req, res, next) {
  try {
    let update = true;
    let sess = req.session;
    let adminCheck = await loginBL.checkAdmin(sess);

    if (adminCheck) {
      let idUser = req.body;
      let userFnd = await userAdminBL.getUserByID(idUser);

      res.render("userdata", { user: userFnd, upd: update });
    } else res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async function (req, res, next) {
  try {
    let sess = req.session;
    let adminCheck = await loginBL.checkAdmin(sess);

    if (adminCheck) {
      let data = req.body;
      let ans = await userAdminBL.updUserDetails(data);
      let resp = await userAdminBL.getUsers();

      res.render("editusers", { users: resp });
     
    }
  } catch (e) {
    console.log(e);
  }
});

//add user

router.post("/userdata/newuser", async function (req, res, next) {
  try {
    let sess = req.session;
    let adminCheck = await loginBL.checkAdmin(sess);

    if (adminCheck) {
      let data = req.body;
      
      let ans = await userAdminBL.addUserToJson(data);
      
      let resp = await userAdminBL.getUsers();

      res.render("editusers", { users: resp });
    } else res.redirect("/");
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
