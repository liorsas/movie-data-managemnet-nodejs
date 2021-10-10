const jsFileUsers = require("../DALs/FileUsersDal");
const jsUpdFile = require("../DALs/writeToUserFileDal");

//get users from json users.json
async function getUsers() {
  try{
  let usersData = await jsFileUsers.getDataFromUsesrsJs();
  users = usersData.users;
  //console.log(users)
  return users;
}
catch(err){
  console.log(err)
}
}

//delete user

async function delUser(obj) {
  try {
    let usersData = await jsFileUsers.getDataFromUsesrsJs();
    //console.log(obj);

    let users = usersData.users;
    let filterUser = users.filter((el) => el.id !== obj.id);
    usersData.users = [...filterUser];

    let write = await jsUpdFile.updateUserFile(usersData);
    //console.log(usersData.users);

    return write;
  } catch (err) {
    console.log(err);
  }
}

//get user by id
async function getUserByID(userID) {
  try {
    // console.log(userID);
    let usersData = await jsFileUsers.getDataFromUsesrsJs();
    let user = usersData.users.find((el) => el.id == userID.id);
    // console.log(user);
    if (user) {
      // console.log(user);
      return user;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
  }
}
//update user to json file
async function updUserDetails(obj) {
  try{
  let upd = false;
  let usersData = await jsFileUsers.getDataFromUsesrsJs();
  let usersArr = usersData.users;
  let objIndex = usersArr.findIndex((el) => el.id == obj.id);

  if (usersArr[objIndex].username !== obj.username) {
    usersArr[objIndex].username = obj.username;
    upd = true;
  }
  if (usersArr[objIndex].password !== obj.password) {
    usersArr[objIndex].password = obj.password;
    upd = true;
  }
  if (usersArr[objIndex].age !== obj.age) {
    usersArr[objIndex].age = obj.age;
    upd = true;
  }
  if (usersArr[objIndex].role !== obj.role) {
    usersArr[objIndex].role = obj.role;
    upd = true;
  }
  if (usersArr[objIndex].numOfTransactions !== obj.numOfTransactions) {
    usersArr[objIndex].numOfTransactions = obj.numOfTransactions;
    upd = true;
  }



  if (upd) {
    usersData.users = [...usersArr];
    //console.log(usersArr);
    //console.log(usersData.users);
    let write = await jsUpdFile.updateUserFile(usersData);
    return write;
  } else return false;
}
catch(err){
  console.log(err)
}
}

//add user func

async function addUserToJson(obj) {
  try {
    let usersdata = await jsFileUsers.getDataFromUsesrsJs();
    let usersJs = usersdata.users;

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    let idU = usersJs[usersJs.length - 1].id + 1;

    let userObj = {
      id: idU,
      username: obj.username,
      password: obj.pass,
      createDate: today,
      role: obj.role,
      age: obj.age,
      numOfTransactions:obj.tran
    };

    usersJs.push(userObj);
    usersdata.users = [...usersJs];
    let write = await jsUpdFile.updateUserFile(usersdata);

    return write;
  } catch (e) {
    console.log(e);
  }
}
module.exports = {
  getUsers,
  delUser,
  getUserByID,
  updUserDetails,
  addUserToJson,
};
