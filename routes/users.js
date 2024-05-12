const mongoose=require("mongoose");
const plm=require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/bussinesswebsite");//database name

const userSchema=mongoose.Schema({
  username:String,
  userCity:String,
  userAge:String,
  password:String
});

userSchema.plugin(plm);

const usermodel=mongoose.model("usermodel",userSchema);
module.exports=usermodel;
