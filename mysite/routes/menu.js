var express = require("express");
var router = express.Router();
const movieBL = require("../models/movieManageBL.js");
const loginBL = require("../models/loginBL");
//const userAdminBL = require("../models/userAdminBL");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let ans = false;
  let sess = req.session;
  
  let auth = await loginBL.authCheck(sess);
  if (auth) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      ans = true;
    }
    
    let transaction = await loginBL.getTransaction(sess)
    if(!transaction) 
    {
transaction = "unlimited"
    }
    else 
    {
      transaction = transaction - sess.view
    }

    if(transaction == 0)
    {
      res.redirect("/");
    }


   

    res.render("menu", { answer: ans, trans:transaction});
  } else {
    res.redirect("/");
  }
});

//create new movie page

router.get("/crenewmovie", async function (req, res, next) {
  let sess = req.session;
  
  let auth = await loginBL.authCheck(sess);
  if (auth) {
    res.render("newmovie", {});
  } else {
    res.redirect("/");
  }
});

//save movie to json

router.post("/crenewmovie/savemovie", async function (req, res, next) {
  let ans = false;
  let sess = req.session;

  let auth = await loginBL.authCheck(sess);
  if (auth) {
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      ans = true;
    }
    if(!ans){
    sess.view ++;
    let chkView = await movieBL.checkTransaction(sess)
    if(!chkView){
res.redirect("/")
    }
  }
  let transaction = await loginBL.getTransaction(sess)
  if(!transaction) 
  {
transaction = "unlimited"
  }
  else 
  {
    transaction = transaction - sess.view
  }

  if(transaction == 0)
  {
    res.redirect("/");
  }
    let data = req.body;
    let resp = await movieBL.newMovieSave(data);
    return resp
      ? res.render("menu", { answer: ans ,trans: transaction })
      : res.render("newmovie", {});
  } else {
    res.redirect("/");
  }
});

//search movies page

router.get("/search", async function (req, res, next) {
  try{

  let sess = req.session;

  let auth = await loginBL.authCheck(sess);
  if (auth) {
    let datagener = await movieBL.getGenresToSearch();
let dataLang = await movieBL.getLangToSearch()


    res.render("search", { genres: datagener ,language:dataLang});
  } else {
    res.redirect("/");
  }
}
catch(err){
  console.log(err)
}
}
);
//search movies results page
router.post("/search/results", async function (req, res, next) {
  try{
  let sess = req.session;
let ans = false
  let auth = await loginBL.authCheck(sess);
  if (auth) {
    let data = req.body;
    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      ans = true;
    }
    if(!ans){
    sess.view ++;
    let chkView = await movieBL.checkTransaction(sess)
    if(!chkView){
res.redirect("/")
    }
  }

    let resp = await movieBL.searchingMovie(data);
    

    if (resp) {
      let ans = false;
      let srcArr = [];
      let chkMovie = resp[0];
      if (chkMovie) {
        ans = true;
      }

      for (i = 1; i < resp.length; i++) {
        srcArr[i] = resp[i];
      }

      res.render("searchrst", {
        movie: chkMovie,
        sameGenre: srcArr,
        answer: ans,
      });
    }
  } else {
    res.redirect("/");
  }
}
catch(err){
  console.log(err)
}
}
);
//get back to search result

router.get("/search/results",async function (req, res, next){



})

//movie data by id (master details page)
router.get("/search/results/moviedata/:id", async function (req, res, next) {
  try{
  let sess = req.session;
let ans = false
  let auth = await loginBL.authCheck(sess);
  if (auth) {

    let adminCheck = await loginBL.checkAdmin(sess);
    if (adminCheck) {
      ans = true;
    }
    if(!ans){
    sess.view ++;
    let chkView = await movieBL.checkTransaction(sess)
    if(!chkView){
res.redirect("/")
    }
  }
    let movieId = req.params.id;
    let moviedata = await movieBL.getMovieDate(movieId);
    res.render("moviedata", { movieObj: moviedata[0] });
  } else {
    res.redirect("/");
  }
}
catch(err){
  console.log(err)
}
}
);


// redirect user admin route
router.get("/editusers", async function (req, res, next) {
  res.redirect("/editusers");
});


module.exports = router;
