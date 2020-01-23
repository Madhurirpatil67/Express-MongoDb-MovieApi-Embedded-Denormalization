let express=require("express");
let router=express.Router();
let Joi=require("@hapi/joi");
let genre=require("../../../Assignment/dbModels/movie/genre");

router.post("/createGenre",async(req,res)=>{
    let {error}=genreValidation(req.body);
    if(error){
        res.send(error.details[0].message);
    }
    let data=new genre.genreModel({
        name:req.body.name
    });
    let item=await data.save();
    res.send({message:"Data Inserted Successfully",d:item});
});

function genreValidation(error){
    let data=Joi.object({
        name:Joi.string().required()
    });
    return data.validate(error);
}

module.exports=router;