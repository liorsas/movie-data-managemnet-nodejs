const jsRUsrFile = require("../DALs/FileUsersDal");
const jsRNMFile = require("../DALs/FileNewMovieDal");
const getShowsData = require("../DALs/wsShowsDal");
const jsWriteToFile = require("../DALs/writeToFileDal");
const jsFileUsers = require("../DALs/FileUsersDal");
const jsUpdFile = require("../DALs/writeToUserFileDal");
const e = require("express");

//add new movie to json newmovies
async function newMovieSave(obj) {
  try{
  let movieData = await jsRNMFile.getDataNewMovie();

  if (!movieData.movies) {
    let resp = await getShowsData();

    let idM = resp.data[resp.data.length - 1].id;
    const nextFile = {
      movies: [],
    };

    nextFile.movies.push({
      id: idM + 1,
      name: obj.name,
      language: obj.lang,
      genres: obj.gener.split(","),
    });

    let write = await jsWriteToFile.saveToFile(nextFile);
  } else {
    let lastEl = movieData.movies[movieData.movies.length - 1];
    const idM = lastEl.id;

    movieData.movies.push({
      id: idM + 1,
      name: obj.name,
      language: obj.lang,
      genres: obj.gener.split(","),
    });
    let write = await jsWriteToFile.saveToFile(movieData);
  }
  return true;
}
catch(err){
  console.log(err)
}

}
//create array of all the genre
async function getGenresToSearch() {
  try{
  let geners = [];

  let resp = await getShowsData();
  let genre = resp.data.map((el) => el.genres);
  geners.push(...genre);

  let movieData = await jsRNMFile.getDataNewMovie();
  if (movieData.movies) {
    let genreJS = movieData.movies.map((el) => el.genres);
    geners.push(...genreJS);
   

    let uniGenerArr = geners.flat();
    
    let uniqueArr = new Set(uniGenerArr);
    let unique = [...uniqueArr];

    return unique;
  } else {
    let uniGenerArr = geners.flat();

    let uniqueArr = new Set(uniGenerArr);

    let unique = [...uniqueArr];

    return unique;
  }
}
catch(err){
  console.log(err)
}
}


// create array of all the languages

async function getLangToSearch() {
  try{
  let languages = [];

  let resp = await getShowsData();
  let lang = resp.data.map((el) => el.language);
  languages.push(...lang);

  let movieData = await jsRNMFile.getDataNewMovie();
  if (movieData.movies) {
    let langJS = movieData.movies.map((el) => el.language);
    languages.push(...langJS);

    let unilanguageArr = languages.flat();

    let uniqueArr = new Set(unilanguageArr);
    let unique = [...uniqueArr];

    return unique;
  } else {
    let uniLangArr = languages.flat();

    let uniqueArr = new Set(uniLangArr);

    let unique = [...uniqueArr];

    return unique;
  }
}
catch(err){
  console.log(err)
}
}


//search movie by name,and genre
async function searchingMovie(obj) {
  try{

  let rtnMovieArr = [];
  
  let resp = await getShowsData();
  let wsShows = resp.data;
  let moviesArr = wsShows.map((el) => ({
    id: el.id,
    name: el.name,
    language: el.language,
    genres: el.genres,
  }));

  //newmoviesjson
  let movieData = await jsRNMFile.getDataNewMovie();
  if (!movieData.movies) {
    let sameNameOFMovie = moviesArr.find((el) => el.name.toLowerCase() == obj.mname.toLowerCase());

    rtnMovieArr.push(sameNameOFMovie);

    let filterArr = moviesArr.filter(
      (el) => el.genres.includes(obj.genre) === true
    );

    rtnMovieArr.push(...filterArr);
  } else {
    moviesArr.push(...movieData.movies);
    let sameNameOFMovie = moviesArr.find((el) => el.name.toLowerCase() == obj.mname.toLowerCase());
    rtnMovieArr.push(sameNameOFMovie);

    let filterArr = moviesArr.filter(
      (el) => el.genres.includes(obj.genre) === true
    );
    rtnMovieArr.push(...filterArr);
  }

  
  return rtnMovieArr;
}
catch(err){
  console.log(err)
}
}
//get movie data by id
async function getMovieDate(idMovie) {
  try{

  let resp = await getShowsData();
  let showArr = resp.data;
  let movieArr = showArr.filter((el) => el.id == idMovie);
  if (movieArr.length > 0) {
    let fndMovie = movieArr.map((el) => ({
      id: el.id,
      name: el.name,
      language: el.language,
      genres: el.genres,
      pic: el.image.medium,
    }));
    return fndMovie;
  } else {
    let movieData = await jsRNMFile.getDataNewMovie();
    movieArr = movieData.movies.filter((el) => el.id == idMovie);

    let fndMovie = movieArr.map((el) => ({
      id: el.id,
      name: el.name,
      language: el.language,
      genres: el.genres,
    }));




    return fndMovie;
  }
}
catch(err){
  console.log(err)
}
}

async function checkTransaction(sessData){

try{


let usersdata = await jsFileUsers.getDataFromUsesrsJs();
usersJs = usersdata.users;
let user = usersJs.find(el => el.username == sessData.username && el.password == sessData.pass )


if(user.numOfTransactions >= sessData.view)
{
  return true
}
else {
  return false
}
}

catch(e){
  console.log(x)
}


}

module.exports = {
  newMovieSave,
  searchingMovie,
  getGenresToSearch,
  getLangToSearch,
  getMovieDate,
  checkTransaction
};
