let express=require("express");
let app=express();
let mongoose=require("mongoose");
let port=4600||process.env.PORT;
app.use(express.json());

let user=require("./routes/user");

mongoose
.connect("mongodb://localhost/STOREDATA",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log(`connected to db`))
.catch(error=>console.log(`something went to wrong ${error.message}`))
app.listen(port,()=>console.log(`connected to port`));

app.use("/api",user);