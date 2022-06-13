const { result } = require('@hapi/joi/lib/base');
const { response } = require('express');
const { request } = require('express');
const session = require('express-session');
const { findOneQuiz } = require('../models/quiz');
const Quiz = require('../models/quiz');

const tagController = {
    
    findAllQuiz: async (request, response) => {
        //console.log('je suis dans tagController');
        const allQuiz = await Quiz.findAllQuiz();
        if(allQuiz === "") {
            response.status(200).json('Pas de contenu !');
        }else {
            if(response.locals) {
                console.log('locals',response.locals);
            }
         if(response.locals?.user?.auth?.Authorization) {
            console.log('response.locals.authorization',response.locals?.user?.auth?.Authorization)
         }
         console.log('request.headers dans quizcontroller',request.headers['authorization']);
            //console.log('allQuiz dans controller' ,allQuiz.rows)
            response.header({'Authorization': response.locals.connectedStudent?.auth?.Authorization})
            console.log('session.user',response.locals.connectedStudent)
            response.locals.quizs = allQuiz.rows;
            response.render('index')

        }
    },
    findOneQuiz: async (request, response) => {
        const id = request.params.id
        //console.log('id dans controller', id)
        const oneQuiz = await Quiz.findOneQuiz(id);
        if(oneQuiz === "") {
            response.status(200).json('Pas de contenu !');
        }else {
            const alltag = oneQuiz.rows[0].tags;
            alltag.forEach(element => {
                console.log(element);
            });
            
            const quizInfo = {
                title: oneQuiz.rows[0].title,
                description: oneQuiz.rows[0].description,
                author: oneQuiz.rows[0].lastname +' '+ oneQuiz.rows[0].firstname,
                nbQuestion: oneQuiz.rowCount,
                tags: oneQuiz.rows[0].tags,
                answer: oneQuiz.rows[0].answer
            }
            if(request.session.connectedStudent) {
                console.log('response.locals.connectedStudent',response.locals.connectedStudent)
                response.render('play-quiz', {quiz: oneQuiz.rows, quizInfo});
                
            } else {
                console.log('quiz dans controller',oneQuiz.rows);
                
            response.render('quiz', {quiz: oneQuiz.rows, quizInfo});
            }
            
        }
    },
    findOneQuizPost: async (request, response) => {
        const id = request.params.id;
        const body = request.body;
        //console.log('id dans controller', id)
        //console.log('body',body);
        const result = await Quiz.findOneQuiz(id)
        let resultats = [];   
        let nbscore = 0; 
        let nberror = 0;   
        //console.log('result asnwser', result.rows, 'body', body);

        for (let idbody in body) {
            let splitId = parseInt(idbody.split(','),10);
            let splitBody = parseInt(body[idbody].split(','),10)
        console.log('id', splitId, splitBody);
        console.log('test', body[idbody].split(','))
        if(splitId === splitBody) {
            nbscore = ++nbscore;
            
        } else if(splitId !== splitBody){
            nberror = ++nberror;
        }
        
        }
        const quizInfo = {
            title: result.rows[0].title,
            description: result.rows[0].description,
            author: result.rows[0].lastname +' '+ result.rows[0].firstname,
            nbQuestion: result.rowCount,
            tags: result.rows.tags,
            nbError: nberror,
            nbScore: nbscore
        }

        console.log(quizInfo)
        console.log('nbScore',nbscore);
        console.log('nbError',nberror);
        response.render('score', {quiz: result.rows, quizInfo});

    
}
}

module.exports = tagController;