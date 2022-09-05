const express = require('express');
const router = express.Router();
const db = require("../db/searches")
require('dotenv').config()

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));

router.post("/", (req,res) =>{
    const isValid = true
    if(isValid){
        res.redirect(`search/results?q=${req.body.searchKey}`)
    } else {
        console.log("err")
        res.render("search", {searchKey: req.body.searchKey })
    }
})

router.get(`/results`, async function (req, res) {
	const url =
		`https://api.giphy.com/v1/gifs/search?q=${req.query.q}&api_key=${process.env.GIPHY_API_KEY}&limit=10`;
	const options = {
		method: 'GET',		
	};
	const response = await fetch(url, options)
		.then(res => res.json())
		.catch(err => console.error('error:' + err));
	try {         
		let response = await fetch(url, options);
		response = await response.json();
        let urlresult = [];
        for (let i =0; i<response.data.length; i++){
            urlresult += response.data[i].url +"," ;
        }
        res.send(urlresult)
        await db.storeRsults(req.query.q,urlresult);
	} catch (err) {
		console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
	}
});

router.get('/', (req,res) =>{
    res.render("search")

})

module.exports = router;