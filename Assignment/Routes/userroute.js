let express=require("express");
let router=express.Router();
let joi=require("@hapi/joi");
let user=require("../dbModels/userinfo");

//fetch
router.get("/fetchUserInfo",async(req,res)=>{
   let data=await user.find();
   res.send({d:data});
});

//fetch by id
router.get("/fetchUserInfo/:id",async(req,res)=>{
   let data=await user.findById(req.params.id);
   if(!data){return res.status(404).send({message:"Invalid User Id"})}
   res.send({d:data});
});


//create
router.post("/createUserInfo",async(req,res)=>{
  let userdata=await user.findOne({"UserLogin.EmailId":req.body.UserLogin.EmailId});
  if(userdata){res.status(403).send({message:"User Already Exist..."})}
  let {error}=validationError(req.body);
  if(error){
     return res.send(error.details[0].message);
  }
  let newUser=new user({
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      Address:req.body.Address,
      MobileNo:req.body.MobileNo,
      UserLogin:req.body.UserLogin
   })    
   let data=await newUser.save();
   res.send({message:"Thank You,Data Inserted Successfully",d:data});
});

//update
router.put("/updateUser/:id",async(req,res)=>{
   let userdata=await user.findById(req.params.id);
   if(!userdata){
      return res.status(404).send({message:"Invalid User Id"});
   }
   let {error}=validationError(req.body);
   if(error){
      return res.send(error.details[0].message);
   }
   userdata.FirstName=req.body.FirstName,
   userdata.LastName=req.body.LastName,
   userdata.Address.Country=req.body.Address.Country,
   userdata.Address.State=req.body.Address.State,
   userdata.Address.City=req.body.Address.City,
   userdata.MobileNo=req.body.MobileNo,
   userdata.UserLogin.EmailId=req.body.UserLogin.EmailId,
   userdata.UserLogin.password=req.body.UserLogin.password
   let data=await userdata.save();
   res.send({message:"Data Updated Successfully",d:data});
});

//remove
router.delete("/removeUserInfo/:id",async(req,res)=>{
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
      Address:{
        Country:joi.string().required().min(3).max(100),
        State:joi.string().required().min(3).max(100),
        City:joi.string().required().min(3).max(100)
      },
      MobileNo:joi.string().required(),
      UserLogin:{
                  EmailId:joi.string().required().email(),
                  password:joi.string().required()
                }
   })
   return schema.validate(error);
};
module.exports=router;

