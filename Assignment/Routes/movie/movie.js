let express=require("express");
let router=express.Router();
let Joi=require("@hapi/joi");
let movie=require("../../../Assignment/dbModels/movie/movie");
let genres=require("../../../Assignment/dbModels/movie/genre");


//fetch
router.get("/fetchMovie",async(req,res)=>{
    let data=await movie.find();
    res.send({d:data});
 });
 
 //fetch by id
 router.get("/fetchMovie/:id",async(req,res)=>{
    let data=await movie.findById(req.params.id);
    if(!data){return res.status(404).send({message:"Invalid Movie Id"})}
    res.send({d:data});
 });
 
 //create Movie
router.post("/createMovie",async(req,res)=>{
    let {error}=MovieValidation(req.body);
    if(error){return res.send(error.details[0].message);}
    let genredata=await genres.genreModel.findById(req.body.genreId);
    if(!genredata){return res.status(403).send({message:"Invalid Genre Id"});}
    let data=new movie({
        Name:req.body.Name,
        Actor:req.body.Actor,
        Price:req.body.Price,
        genre:
        {
            _id:genredata._id,
            name:genredata.name
        }
    });  
    let item=await data.save();
    res.send(item);
});

function MovieValidation(error){
    let data=Joi.object({
        Name:Joi.string().required(),
        Actor:Joi.string().required(),
        Price:Joi.string().required(),
        genreId:Joi.string().required()
    });
    return data.validate(error);
}
module.exports=router;