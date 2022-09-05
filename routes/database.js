// importing packages
const express = require('express');
const router = express.Router();
const db = require("../db/searches");

// const fetch = (...args) =>
	// import('node-fetch').then(({default: fetch}) => fetch(...args));

router.get("/", async function (req,res) {
    const searches = await db.getResults();
	res.send(searches);
})

router.get('/', (req,res) =>{
    res.render("database")
})

module.exports = router;