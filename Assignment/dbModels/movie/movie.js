let mongoose=require("mongoose");
let genre=require("../../../Assignment/dbModels/movie/genre");

let movieSchema=new mongoose.Schema({
    Name:{type:String,required:true},
    Actor:{type:String,required:true},
    Price:{type:Number,required:true},
    genre:{type:genre.genreSchema}
});

let movieModel=mongoose.model("Movies",movieSchema);

module.exports=movieModel;