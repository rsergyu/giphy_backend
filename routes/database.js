// importing packages
const express = require('express');
const router = express.Router();
const db = require("../db/searches");

// const fetch = (...args) =>
	// import('node-fetch').then(({default: fetch}) => fetch(...args));
    
// router.get('/', (req,res) =>{
// res.render("database")
// })


router.get("/",async function (req,res) {
    const searches = await db.getResults();
	res.render("database", {searches: searches});
})

function PaginatedResults (model) {
    return (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startPoint = (page -1 ) * limit
        const endPoint = page  * limit

        const results = {}

        if(endPoint < model.length){
            results.next =  {
                page: page + 1,
                limit: limit
            }
        }

        if(startPoint > 0){
            results.previous =  {
                page: page - 1,
                limit: limit
            }
        }

        results.results = model.slice(startPoint,endPoint)

        res.PaginatedResults = results
        next()
    }
 
}

module.exports =  router;