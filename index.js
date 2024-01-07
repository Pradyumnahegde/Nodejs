const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

// app.use(express.json()); 
app.use(bodyParser.json());

app.get('/',(req,res) => {
    res.send('Hello world')
})

app.get('/home', (req,res)=>{
    res.send('Hello');
})

app.get('/route-handler', (req,res)=>{
    res.json({
        name: "prad",
        age: 20
    })
})

app.post('/conversation', (req,res) => {
    console.log(req.headers);
    console.log(req.body)  // if u see this as undefined then do app.use(express.json()); // or we can use body-parser.json()
    res.send({
        msg: "2 + 2 = 4"
    });
    
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})