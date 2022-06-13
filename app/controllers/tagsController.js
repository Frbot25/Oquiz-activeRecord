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
             console.log(allTags.rows);
            response.render('tags', {tags: allTags.rows});
            //console.log(allTags.rows);
            // response.json({
            //     data: allTags.rows
            // });
        }
    },
    findOneTags: async (request, response) => {
        const id = request.params.id
        console.log('je suis dans tagController');
        const oneTags = await Tags.findOneTag(id);
        if(oneTags === "") {
            response.status(200).json('Pas de contenu !');
        }else {
             console.log(oneTags.rows);
            response.render('tag', {tags: oneTags.rows});

        }
    }
}

module.exports = tagController;