const knex = require("./knex")

function storeRsults(searchWord,results) {
    return knex("searches").insert({searchKey: searchWord, resultsUrl: results});
}

function getResults(){
    return knex("searches").select("*");
}

module.exports={
    storeRsults,
    getResults
}