const { response } = require('express');
const { request } = require('express');
const Quiz = require('../models/quiz');

const tagController = {
    
    findAllQuiz: async (request, response) => {
        console.log('je suis dans tagController');
        const allQuiz = await Quiz.findAllQuiz();
        if(allQuiz === "") {
            response.status(200).json('Pas de contenu !');
        }else {
             console.log(allQuiz.rows);
            response.render('index', {quizs: allQuiz.rows});
            //console.log(allQuiz.rows);
            // response.json({
            //     data: allTags.rows
            // });
        }
    },
    findOneQuiz: async (request, response) => {
        const id = request.params.id
        console.log('je suis dans tagController');
        const oneQuiz = await Quiz.findOneQuiz(id);
        if(oneQuiz === "") {
            response.status(200).json('Pas de contenu !');
        }else {
             console.log('quiz dans controller',oneQuiz.rows);
            response.render('quiz', {quiz: oneQuiz.rows});
            //console.log(allTags.rows);
            // response.json({
            //     data: allTags.rows
            // });
        }
    }
}

module.exports = tagController;