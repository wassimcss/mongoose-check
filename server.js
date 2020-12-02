const express = require("express");
const app = express()
let mongoose = require("mongoose");
require("dotenv/config")
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true },()=> console.log("connected to db"));
let Person = require("./models/person");
app.use(express.json());
//create one document
const create = () => {
    const person = new Person({
        name : "Mary",
        age : 100,
        favouriteFoods : ["hargma","burrito"]
    });
    person.save()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}
//create()


// create one element using route
app.post("/",(req,res)=>{
    const person = new Person({
        name : req.body.name,
        age : req.body.age,
        favouriteFoods : req.body.favouriteFoods
    });
    person.save()
    .then(data => res.json(data))
    .catch(err => console.log(err))

})
// create many records
let arrayOfpeople = [
    {
        name : "John",
        age : 25,
        favouriteFoods : ["burrito"]
    },
    {
        name : "marco",
        age : 23,
        favouriteFoods : ["burrito"]
    },
    {
        name : "Hana",
        age : 26,
        favouriteFoods : ["Bessissa ","Laznia"]
    },
    {
        name : "Sami",
        age : 15,
        favouriteFoods : ["spagetti ","Laznia"]
    },
    {
        name : "Silina",
        age : 30,
        favouriteFoods : ["kafteji ","lablabi"]
    }
]
const createMany = () => {
    Person.create(arrayOfpeople,(err,data)=>{
        if (err) console.log(err)
        else console.log(data)
    });
}
//createMany()


// Use model.find() to Search Your Database
const findAll = (personName) => {
    Person.find({name:personName},(err,data)=> {
        if (err) console.log(err)
        else console.log(data)
    })
}
//findAll("Sami")

// Use model.find() to Search Your Database with using routes
app.get("/:name",(req,res)=> {
    Person.findOne({name:"fawzi"},(err,person)=>{
        if (err)  console.log(err)
        else res.json(person)
    })
})

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOne = (food) => {
    Person.findOne({favouriteFoods:food},(err,data)=> {
        if (err) console.log(err)
        else console.log(data)
    })
}
//findOne( [ "chawrma" ])

//Use model.findById() to Search Your Database By _id
const findById = (id) => {
    Person.findById({_id:id},(err,data) => {
        if (err) console.log(err)
        else console.log(data)
    });
}
//findById("5fc7a9959eba1934283315a0")

//Perform Classic Updates by Running Find, Edit, then Save
const perform = (personId) => {
    let hamburger = "hamburger"

    Person.findById({_id:personId},(err,data) => {
        if (err) console.log(err);
        else {
            data.favouriteFoods.push(hamburger)
            data.save();
            console.log(data.favouriteFoods)
        }
        
    })
    
}
//perform("5fc7a9959eba1934283315a0")

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (PersonName) => {
    let newAge = 20;
    Person.findOneAndUpdate({name:PersonName},{$set:{age:newAge}},{new:true},(err,data) => {
        if (err) console.log(err);
        else {console.log(data)}
    })
}
//findAndUpdate("Sami");

//Delete One Document Using model.findByIdAndRemove
const Delete = (personId) => {
   Person.findByIdAndRemove({_id:personId},(err,data) => {
       if (err) console.log(err);
       else console.log(data)
   }) ;
}
//Delete("5fc7a9959eba1934283315a0")


//MongoDB and Mongoose - Delete Many Documents with model.remove()
const DeleteMany = () => {
    let Mary = "Mary";
    Person.find({name:Mary},(err,data)=> console.log(data))
    Person.remove({name:Mary},(err,data) => {
        if (err) console.log(err);
        else console.log(data)
    })
    
    
}
//DeleteMany()

//Chain Search Query Helpers to Narrow Search Results
const queryHelper = () => {
    let food = "burrito"
    Person.find({favouriteFoods:food})
    .sort({name:1})
    //.limit(2)
    .select({name:1,favouriteFoods:1})
    .exec((err,data) => {
        if (err) console.log(err);
        else console.log(data)
    })
}
//queryHelper();
    




//server listen in port 5000
app.listen(5000,(err)=> {
    if (err) throw err
    else 
    console.log("server is running")
})