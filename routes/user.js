let express=require("express");
let router=express.Router();
let joi=require("@hapi/joi");
let user=require("../dbModel/user");

//fetch
router.get("/fetchUser",async(req,res)=>{
   let data=await user.find();
   res.send({d:data});
});

//fetch by id
router.get("/fetchUser/:id",async(req,res)=>{
   let data=await user.findById(req.params.id);
   if(!data){return res.status(404).send({message:"Invalid User Id"})}
   res.send({d:data});
});


//create
router.post("/createUser",async(req,res)=>{
  let user=await user.findOne({"UserLogin.EmailId":req.body.UserLogin.EmailId});
  if(user){res.status(403).send({message:"User Already Exist..."})}
  let {error}=validationError(req.body);
  if(error){
     return res.send(error.details[0].message);
  }
  let newUser=new user({
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      MobileNO:req.body.MobileNo,
      UserLogin:req.body.UserLogin
   })    
   let data=await newUser.save();
   res.send({message:"Thank You,Data Inserted Successfully",d:data});
});

//update
router.put("/updateUser/:id",async(req,res)=>{
   let user=await user.findById(req.params.id);
   if(!user){
      return res.status(404).send({message:"Invalid User Id"});
   }
   let {error}=validationError(req.body);
   if(error){
      return res.send(error.details[0].message);
   }
   user.FirstName=req.body.FirstName,
   user.LastName=req.body.LastName,
   user.MobileNO=req.body.MobileNO,
   user.UserLogin.EmailId=req.body.EmailId,
   user.UserLogin.password=req.body.password
   let data=await user.save();
   res.send({message:"Data Updated Successfully",d:data});
});

//remove
router.delete("/removeUser/:id",async(req,res)=>{
    let data=await user.findByIdAndRemove(req.params.id);
    if(!data){
       res.status(404).send({message:"Invalid User Id"});
    }
    res.send({message:"Thank You! Come Back Again:)"});
})

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
module.exports(router);

