let express=require("express");
let router=express.Router();
let user=require("../dbModel/user");
let bcrypt=require("bcrypt");

//fetch
router.get("/fetchUser",async(req,res)=>{
   let data=await user.userModel.find();
   res.send({d:data});
});

//fetch by id
router.get("/fetchUser/:id",async(req,res)=>{
   let data=await user.userModel.findById(req.params.id);
   if(!data){return res.status(404).send({message:"Invalid User Id"})}
   res.send({d:data});
});


//create
router.post("/createUser",async(req,res)=>{
  let email=await user.userModel.findOne({"UserLogin.EmailId":req.body.UserLogin.EmailId});
  if(email){res.status(403).send({message:"User Already Exist..."})}

  let {error}=user.validationError(req.body);
  if(error){
     return res.send(error.details[0].message);
  }
  let newUser=new user.userModel({
      FirstName:req.body.FirstName,
      LastName:req.body.LastName,
      MobileNO:req.body.MobileNO,
      UserLogin:req.body.UserLogin
   })    
   let salt=await bcrypt.genSalt(10);
   newUser.UserLogin.password=await bcrypt.hash(newUser.UserLogin.password,salt)
   let data=await newUser.save();
   res.send({message:"Thank You,Data Inserted Successfully",d:data});
});

//update
router.put("/updateUser/:id",async(req,res)=>{
   let user=await user.userModel.findById(req.params.id);
   if(!user){
      return res.status(404).send({message:"Invalid User Id"});
   }
   let {error}=user.validationError(req.body);
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
    let data=await user.userModel.findByIdAndRemove(req.params.id);
    if(!data){
       res.status(404).send({message:"Invalid User Id"});
    }
    res.send({message:"Thank You! Come Back Again:)"});
})


module.exports=router;

