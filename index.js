// import fetch from 'node-fetch';
const express = require("express");
const app = express()
const userSearch = require('./routes/search')
const database = require('./routes/database.js')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')



app.use("/search", userSearch)
app.use("/database", database)
// app.get("/searh", async function(req,res))

app.listen(3000)