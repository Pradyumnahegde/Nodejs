// Tokens are crucial in maintaining identity of users = Authentication

// let people sign up to your website only allow signed in users to see people (create a dummy people list)

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "1234567";

const app = express();
app.use(express.json());


const ALL_USERS = [
  {
    username: "pph@gmail.com",
    password: "123",
    name: "pph pph",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // write logic to return true or false if this user exists
  // in ALL_USERS array
  // try to use find func in js
  let userExists = false;
  for(let i =0; i<ALL_USERS.length; i++){
    if(ALL_USERS[i].username == username && ALL_USERS[i].password ==password){
      userExists = true;
    }
  }
  return userExists;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username or other than username that has been sent

    res.json({ 
      users : ALL_USERS.filter((value)=> {     // using filter fn
        if(value.username == username){
          return false
        } else{
          return true;
        }
      })
    })
  
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000)