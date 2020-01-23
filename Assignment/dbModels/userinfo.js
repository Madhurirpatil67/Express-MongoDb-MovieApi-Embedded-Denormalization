let mongoose=require("mongoose");

let userInfoSchema=mongoose.Schema({
  FirstName:{type:String,required:true,min:3,max:200,alphanum:true,trim:true},
  LastName:{type:String,min:3,max:200,alphanum:true,required:true,trim:true},
  Address:{
    Country:{type:String,required:true,min:3,max:100,alphanum:true,trim:true},
    State:{type:String,required:true,min:3,max:100,alphanum:true,trim:true},
    City:{type:String,required:true,min:3,max:100,alphanum:true,trim:true}
  },
  MobileNo:{type:String,required:true},
  UserLogin:{
      EmailId:{type:String,required:true,unique:true},
      password:{type:String,required:true}
  }
});

let userModel=mongoose.model("UsersInfo",userInfoSchema);
module.exports=userModel;