// BUILD YOUR SERVER HERE

const express = require('express');
const { generate } = require('shortid');
const dbFunctions = require('./users/model');

const app = express();
app.use(express.json())

//[POST] Creates a user using the information sent inside the request body.
    app.post("/api/users", (req,res) => {
    console.log("this is the re", req.body)
    const user = req.body    
    if (!user.name || !user.bio) {
        res.status(400).json({message:"Please provide name and bio for the user" })
    } else {
        dbFunctions.insert(req.body)
        .then( user => {
            res.status(201).json(user) //do we need to return new user with id?
        })
        .catch(err => res.status(500).json({message: err, message2: "There was an error while saving the user to the database"}))
    }
})

// [GET] Returns an array users.
app.get("/api/users", (req, res) => {
    dbFunctions.find()
    .then(users => {
        // console.log(users)
        res.status(200).json(users)
    })
    .catch(err => res.status(500).json(err))
})

//[GET] Returns the user object with the specified id.
app.get("/api/users/:id", (req, res) => {
    const user = req.params.id 
    dbFunctions.findById(user)
    .then(user => {
        if(!user){
            res.status(404).json({message: "The user ID does not exist"})
         }else{ 
            res.status(200).json(user)  
         }
    })
    .catch(err => res.status(500).json(err))
})

//[DELETE] Removes the user with the specified id and returns the deleted user.

app.delete("/api/users/:id", (req, res) => {
    const user = req.params.id
    dbFunctions.remove(user)
    .then(user => {
        if(!user){
            res.status(404).json({message: "The user ID does not exist"})
        }else{
            res.status(200).json(user)
        }
        })
    .catch(err => res.status(500).json(err))

})

//[PUT]Updates the user with the specified id using data from the request body. Returns the modified user
app.put("/api/users/:id", (req, res) => {
    const user = req.params.id
    dbFunctions.update(user)
    .then(user => {
        if(!user){
            res.status(404).json({message: "The user ID does not exist"})
        }else{
            res.status(200).json(user)
        }
    })
    .catch(err => res.status(500).json(err))
})


app.use("*", (req, res) => {
    res.status(404).json({message: "404 Not Found)*:"})
})

    // app.post("/api/users",)



module.exports = {app}; // EXPORT YOUR SERVER instead of {}
