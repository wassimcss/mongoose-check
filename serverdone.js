// other tentaive using callback done 


const express = require("express");
const app = express()
let mongoose = require("mongoose");
require("dotenv/config")
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("connected to db"));
let Person = require("./models/person");
app.use(express.json());
//done
const done = (d1, d2) => {
    console.log(d1, d2)
}

//create one document
const create = (done) => {
    const person = new Person({
        name: "Mary",
        age: 100,
        favouriteFoods: ["hargma", "burrito"]
    });
    person.save((err, data) => {
        if (err) done(err)
        return done(null, data)
    })
}
//create(done)

let arrayOfpeople = [
    {
        name: "John",
        age: 25,
        favouriteFoods: ["burrito"]
    },
    {
        name: "marco",
        age: 23,
        favouriteFoods: ["burrito"]
    },
    {
        name: "Hana",
        age: 26,
        favouriteFoods: ["Bessissa ", "Laznia"]
    },
    {
        name: "Sami",
        age: 15,
        favouriteFoods: ["spagetti ", "Laznia"]
    },
    {
        name: "Silina",
        age: 30,
        favouriteFoods: ["kafteji ", "lablabi"]
    }
]
const createMany = (done) => {
    Person.create(arrayOfpeople, (err, data) => {
        if (err) done(err)
        else done(null, data)
    });
}
//createMany(done);

// Use model.find() to Search Your Database
const findAll = (personName,done) => {
    Person.find({name:personName},(err,data)=> {
        if (err) done(err)
        else done(null,data)
    })
}
//findAll("Sami",done)

//Use model.findOne() to Return a Single Matching Document from Your Database
const findOne = (food) => {
    Person.findOne({favouriteFoods:food},(err,data)=> {
        if (err) done(err)
        return done(null,data)
    })
}
//findOne( [ "burrito" ],done)
//Use model.findById() to Search Your Database By _id
const findById = (id,done) => {
    Person.findById({_id:id},(err,data) => {
        if (err) done(err)
        else done(null,data)
    });
}
//findById("5fc7fdba7a4f543108824c47",done)

//Perform Classic Updates by Running Find, Edit, then Save
const perform = (personId,done) => {
    let hamburger = "hamburger"

    Person.findById({_id:personId},(err,data) => {
        if (err) done(err);
        else {
            data.favouriteFoods.push(hamburger)
            data.save();
            done(null,data.favouriteFoods)
        }  
    })    
}
//perform("5fc7fdba7a4f543108824c47",done)

//Perform New Updates on a Document Using model.findOneAndUpdate()
const findAndUpdate = (PersonName,done) => {
    let newAge = 20;
    Person.findOneAndUpdate({name:PersonName},{$set:{age:newAge}},{new:true},(err,data) => {
        if (err) done(err);
        else {done(null,data)}
    })
}
//findAndUpdate("Sami",done);

//Delete One Document Using model.findByIdAndRemove
const Delete = (personId,done) => {
    Person.findByIdAndRemove({_id:personId},(err,data) => {
        if (err) done(err);
        return done(null,data)
    }) ;
 }
 //Delete("5fc7a9959eba1934283315a0",done)

 //MongoDB and Mongoose - Delete Many Documents with model.remove()
const DeleteMany = (done) => {
    let Mary = "Mary";
    Person.find({name:Mary},(err,data) => console.log(data))
    Person.remove({name:Mary},(err,data) => {
        if (err) done(err);
        else done(data)
    })
}
//DeleteMany(done)

//Chain Search Query Helpers to Narrow Search Results
const queryHelper = (done) => {
    let food = "burrito"
    Person.find({favouriteFoods:food})
    .sort({name:1})
    .limit(2)
    .select({name:1,favouriteFoods:1})
    .exec((err,data) => {
        if (err) done(err);
        return done(null,data)
    })
}
//queryHelper(done);



//server listen in port 5000
app.listen(5000, (err) => {
    if (err) throw err
    else
        console.log("server is running")
})