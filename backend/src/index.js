const express =require("express");
const mongoose=require("mongoose");
mongoose.set("strictQuery",true);
const route=require("./route/route.js");
const app=express();
app.use(express.json());
app.use("/",route);
mongoose.connect("mongodb+srv://yachika03:wkaTIq3zkjIou3YI@cluster0.t9qdtvx.mongodb.net/Database1",{
    useNewUrlParser:true
})
.then(()=>console.log("Mongodb is connected"))
.catch(err=>console.log(err))
app.listen(process.env.PORT||3000,function(){
    console.log("express app is running on port "+(process.env.PORT||3000))
})