let mongoose=require("mongoose");

let userSchema=mongoose.Schema({
  FirstName:{type:String,required:true,min:3,max:200,alphanum:true,trim:true},
  LastName:{type:String,min:3,max:200,alphanum:true,required:true,trim:true},
  MobileNO:{type:String,required:true},
  UserLogin:{
      EmailId:{type:String,required:true,unique:true},
      password:{type:String,required:true}
  }
});

let userModel=mongoose.model("users",userSchema);
module.exports=userModel;