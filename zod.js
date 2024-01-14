//  we can use zod for better input validation 

const express = require("express");
const zod = require("zod");
const app = express();


app.use(express.json());
// const schemas = zod.array(zod.number());  // now we can put this in our object schema instead of a single thing

const schema = zod.object({
    email : zod.string(),
    password: zod.string(),
    country: zod.literal("IN").or(zod.literal("US")),
    kidneys : zod.array(zod.number()) // specify any type of array**
})

app.post('/health-checkup', (req,res)=>{
    // const kidneys = req.body.kidneys;
    const obj = req.body;
    const response = schema.safeParse(obj);
    if(!response.success){                  // without if condition it will give response success as false
        res.status(401).json({
            msg : "input is invalid"
        });
        return;
    }
    res.send({response})      // if success is true itll show data //{"response":{"success":true,"data":[1,2,3]}}
})

app.listen(3000);