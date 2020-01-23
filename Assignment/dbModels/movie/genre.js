let mongoose=require("mongoose");

let genreSchema=new mongoose.Schema({
    name:{type:String,required:true}
});

let genreModel=mongoose.model("Genres",genreSchema);

module.exports={genreSchema,genreModel};
