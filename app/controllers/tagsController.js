const { response } = require('express');
const { request } = require('express');
const Tags = require('../models/tags');

const tagController = {
    
    findAllTags: async (request, response) => {
        console.log('je suis dans tagController');
        const allTags = await Tags.findAllTag();
        if(allTags === "") {
            response.status(200).json('Pas de contenu !');
        }else {
            response.render('index');
            //console.log(allTags.rows);
            // response.json({
            //     data: allTags.rows
            // });
        }
    }
}

module.exports = tagController;