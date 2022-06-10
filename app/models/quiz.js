const client = require('../database');



class Quiz {
    id;
    name;
        constructor(obj ={}) {
            this.id = obj.id;
            this.name = obj.name;
        for (const proname in obj) {
            this[proname] = obj[proname];
        }
    }
    static findAllQuiz() {
        try {
           const allQuiz = client.query('SELECT * FROM quiz;',);
               return allQuiz;
           
        }catch (error) {
            console.log(error);
        }
    }
    static findOneQuiz(id) {
        try {
            console.log('id dans model', id)
            //const oneQuiz = client.query('SELECT * FROM quiz WHERE id=$1', [id]);
            const oneQuiz = client.query('SELECT * FROM quiz_has_tag JOIN quiz ON quiz.id = quiz_has_tag.quiz_id JOIN "user" ON quiz.user_id = "user".id WHERE "user".id=$1;', [id]);
            return oneQuiz;
        } catch(error) {
            console.log(error);
        }
    }

};

module.exports = Quiz;