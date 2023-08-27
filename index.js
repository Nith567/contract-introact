const Pusher = require("pusher");
const express=require("express")
const app=express();
const path=require("path")
const bodyparser=require("body-parser")


app.use(bodyparser.json())



app.listen(3004,()=>{
     console.log('app is running on 3004');
})
