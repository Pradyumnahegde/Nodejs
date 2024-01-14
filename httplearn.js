const express = require('express');
const app = express();

app.use(express.json());

var users = [{
    name: "John",
    kidneys:[{
        healthy: false }]
}];

// check how many kidneys they have
app.get('/', (req,res)=>{
    const johnKidneys = users[0].kidneys;
    const noOfKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for(let i =0; i<johnKidneys.length;i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys +=1;
        }
    }
    const noOfUnhealthyKidneys = noOfKidneys - numberOfHealthyKidneys;
    
    res.json({
        noOfKidneys,
        numberOfHealthyKidneys,
        noOfUnhealthyKidneys
    })

    console.log(johnKidneys);
})


// user can add new kidney
app.post('',(req,res) =>{
      const isHealthy = req.body.isHealthy;
      users[0].kidneys.push({
        healthy: isHealthy
      })
      res.json({
        msg:'Done!'
      })
})

// user can replace unhealthy kidney to healthy one
app.put('',(req,res)=>{
    for(let i=0;i<users[0].kidneys.length; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})

// remove all unhealthy kidneys
app.delete('/', (res,req)=>{
    const newKidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++){   
    if(users[0].kidneys[i].healthy){
        newKidneys.push({
            healthy: true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg: "done"
    })
})

app.listen(3000);