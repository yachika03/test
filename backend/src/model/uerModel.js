const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        trim:true

    },
     Email:{
        type:String,
        required:true,
        trim:true

     },
      Password:{
        type:String,
        required:true,
        trim:true

      },
       phonenumber:{
        type:Number,
        required:true,
        trim:true

       }
},{timestamps:true});

module.exports=mongoose.model("userCollection",userSchema)