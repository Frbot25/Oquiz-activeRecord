const client = require('../database');



class Quiz {
    id;
    name;
        constructor(obj ={}) {

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
    static async findOneQuiz(id) {
        try {
            //console.log('id dans model', id)
            //const oneQuiz = client.query('SELECT * FROM quiz WHERE id=$1', [id]);
            const oneQuiz =  await client.query('SELECT * FROM questionAndAnswers WHERE quiz_id =$1', [id]);
            //console.log("onquiz dans model",oneQuiz.rows)
            return oneQuiz;
        } catch(error) {
            console.log(error);
        }
    }
    static async findanswerId(id) {
        try {
            //console.log('id dans model', id)
            //const oneQuiz = client.query('SELECT * FROM quiz WHERE id=$1', [id]);
            const answers =  await client.query('SELECT answer_id FROM question WHERE quiz_id =$1', [id]);
            console.log("onquiz dans model",answers.rows)
            return answers;
        } catch(error) {
            console.log(error);
        }
    }

};

module.exports = Quiz;