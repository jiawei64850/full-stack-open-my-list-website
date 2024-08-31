const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
require('dotenv').config();
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.get("/", (req, res) => {
  UserModel.find({})
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.put("/updateUser/:id", (req, res) => {
  const id = req.params.id
  UserModel.findByIdAndUpdate({ _id: id }, { 
      name: req.body.name, 
      email: req.body.email, 
      age: req.body.age 
    })
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.post("/createUser", (req, res) => {
  UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(e => res.json(e))
})

app.delete("/deleteUser/:id", (req, res) => {
  const id = req.params.id
  UserModel.findByIdAndDelete({ _id: id })
    .then(users => res.json(users))
    .catch(e => res.json(e))
})
app.listen(process.env.PORT, () => {
  console.log("Server is Running");
})