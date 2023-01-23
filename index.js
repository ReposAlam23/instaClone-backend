const express = require("express")
const app = express()
const port = 8080 || process.env.PORT
const cors = require("cors")
const fileUpload = require("express-fileupload")
const {Posts} = require("./models/Posts")
const mongoose = require("mongoose")
const path = require("path")

const uri = 'mongodb+srv://Alam:FIRSTDATABASE@cluster0.oct2y5o.mongodb.net/?retryWrites=true&w=majority'

//CONNECTION WITH MONGO-DB

mongoose.set("strictQuery", true)
mongoose.connect(uri, (err)=>{
    if(err){
        console.log("connection to mongoDB failed")
    } else{
        console.log("connection to mongoDB success");
    }
})

app.use(express.json())
app.use(cors())
app.use(fileUpload())


// DUMMY URL 

app.get("/", (req, res)=>{
    res.send('<h1>You are on HomePage of backend server</h1>')
})


// FETCHING THE DATA FOR FRONTEND TO SHOW FROM DB

app.get("/all", async(req, res)=>{
    res.json({
        result: await Posts.find().sort({ _id: "-1" })
    })
})

app.get("/images/:filename", async(req, res)=>{
    console.log(`./uploadedImages/${req.params.filename}`)
    res.sendFile(path.join(__dirname, `./uploadedImages/${req.params.filename}`))
})

// RECIEVING THE POST REQUEST FROM THE FORNTEND

app.post("/post", (req, res)=>{
    const {imagefile} = req.files
    const {name, location, description} = req.body
    console.log({name, location, description, imagefile});
    // res.send("data recieved")
    imagefile.mv("./uploadedImages/" +imagefile.name, (err)=>{
        if(err){
            res.json(err)
        }else{
            const postRecieved = new Posts({
                ...{name, location, description},
                imagefile: imagefile.name
            })
            try{
                const response = postRecieved.save()
                res.json({response})
            }catch(e){
                res.json({message:"Something went wrong", status: e})
            }
        }
    })   
})


app.listen(port, ()=>{ console.log(`port is running at ${port}`)})