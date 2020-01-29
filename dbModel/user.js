let mongoose=require("mongoose");
let joi=require("@hapi/joi");

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

function validationError(error){
  let schema=joi.object({
     FirstName:joi.string().required().min(3).max(200),
     LastName:joi.string().required().min(3).max(200),
     MobileNO:joi.string().required(),
     UserLogin:{
                 EmailId:joi.string().required().email(),
                 password:joi.string().required()
               }
  })
  return schema.validate(error);
};

module.exports={userModel,validationError};