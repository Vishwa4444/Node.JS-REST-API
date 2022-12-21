// console.log("here im vishwa")
const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const mongoDB = 'mongodb://localhost:27017/dog_api'

mongoose.connect(mongoDB,{useNewUrlParser :true,useUnifiedTopology:true});

const db = mongoose.connection
db.on('error',console.error.bind(console,'MongoDB connection error:'));

const dogSchema = new mongoose.Schema({
    name:String,
    breed:String,
    age:Number

})
const Dog = mongoose.model('Dog',dogSchema) 

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const port = 4444  //THIS port No. can be in any range betw 3000 to 8000 

// const dogs = [
//     {
//         name:"Jack", breed:"BullDog"
//     },
//     {
//         name:"Tom", breed:"Husky"
//     }
// ]

app.get("/",(req,res)=>{
     Dog.find((err,dogs) => {
    console.log("DOGS:", dogs)
    res.json(dogs)


    })
    
})

app.get("/dogs/:id",(req,res)=>{
    Dog.findById(req.params.id,(err,dog)=>{
        res.json(dog)
    })
    
})

app.post("/dogs",(req,res)=>{
    //console.log(req.params.id)
    const dog = new Dog({
        name: req.body.name,
        breed: req.body.breed,
        age: req.body.age
    })
    dog.save((err) =>{
        res.json(dog)

    })
    // res.json({message:"ok"})
})

app.put("/dogs/:id",(req,res)=>{
    // console.log(req.params.id)
    Dog.findByIdAndUpdate(req.params.id,req.body,(err)=>{
        res.json({message:`updated dogs ${req.params.id}`})
    })
})

app.delete("/dogs/:id",(req,res)=>{
    //console.log(req.params.id)
    Dog.findByIdAndDelete(req.params.id,req.body,(err)=>{
        res.json({message:`Deleted dogs ${req.params.id}`})
    })
})

app.listen(port,()=>{
console.log(`Listening on port ${port}`)
})





//CRUD : create , Read , Update and delete
//HTTP : GET,POST,PUT/PATCH, DELETE
