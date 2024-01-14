const express = require("express");
const app = express();

app.use(express.json());

// app.get("/health-checkup", (req,res) =>{
//     const kidneyId = req.query.kidneyId;
//     const username = req.headers.username;
//     const password = req.headers.password;
    
//     if(!(username === "prad" && password === "pass")){
//         res.status(400).json({"msg": "User doesnt exist"})
//         return;
//     }

//     if(!(kidneyId == 1 || kidneyId ==2)){
//         res.status(400).json({"msg" : "KidneyId more than 2"})
//         return;
//     }

//     res.json({
//         "msg" : "Your kidney is fine"
//     })
// })

// Using middlewares that have req,res,next
function userMiddleware(req,res,next){
    // const username = req.headers.username;
    // const password = req.headers.password;
    if(username != "prad" && password != "pass"){
        res.status(403).json({"msg": "Input error"})
    }  
    else{
        next();
    }
};
function kidenyMiddleware(req,res,next){
    // const kidneyId = req.query.kidneyId;
    if(kidneyId != 1 && kidneyId != 2){
        res.status(403).json({"msg": "Input kderror"})
    }
    else{
        next();
    }
};

app.get('/health-checkup', userMiddleware, kidenyMiddleware, (req,res)=>{
    res.send("You're healthy")
})

app.get('/kidney-checkup', userMiddleware, kidenyMiddleware, (req,res)=>{
    res.send("Your kidney is fine")
})


//  input validation, if wrong inputs sent then check with backend logic and fix it/ optimise it
// app.post("/health-checkup", (req, res) => {
//   const kidneys = req.body.kidneys;
//   const kidneyLength = kidneys.length;   // or use Number(kidneys);

//   res.send("you have " + kidneyLength + " kidneys");
// });

// app.use((err, req, res, next)=>{
//     res.status(500).send("An internal server error occured");
// })

app.listen(3000);
