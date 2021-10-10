const jsRUsrFile = require("../DALs/FileUsersDal");

//check authentication
async function authCheck(obj) {
  try{
  let data = await jsRUsrFile.getDataFromUsesrsJs();
  let userArr = data.users;

  let validUser = userArr.find(
    (el) => el.username == obj.username && el.password == obj.pass
  );
  if (validUser) {
    return validUser;
  } else return false;
}
catch(err){
  console.log(err)
}
}

//admin authentication

async function checkAdmin(obj) {
  try{

  let data = await jsRUsrFile.getDataFromUsesrsJs();
  let userArr = data.users;
let fndUser = userArr.find(   (el) => el.username == obj.username && el.password == obj.pass
);
if(fndUser)
{
  if(fndUser.role =='Admin')
  {
    return true
  }
  else {
    return false
  }
 
}
return false

  
}
catch(err){
  console.log(err)
}
}

async function getTransaction(obj){
  try{
  let data = await jsRUsrFile.getDataFromUsesrsJs();
  let userArr = data.users;

  let fndUser = userArr.find(el => el.username == obj.username && el.password == obj.pass )
  if(fndUser) {
    return fndUser.numOfTransactions
  }
  else 
  {
    return false
  }


}
catch(err){
  console.log(err)
}
}

module.exports = { authCheck, checkAdmin ,getTransaction};
