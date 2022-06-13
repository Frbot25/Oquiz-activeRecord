const {Router, request, response} = require('express');
const router = Router();


const tagsController = require('./controllers/tagsController');
const quizController = require('./controllers/quizController');
const userController = require('./controllers/userController');

router.get("/", quizController.findAllQuiz);
router.get('/logout', (request, response) => {
    request.session.destroy(function(error){
        console.log("Session Destroyed !");
        response.redirect('/');
    });
});
router.get("/tags", tagsController.findAllTags);
router.get("/quiz/:id", quizController.findOneQuiz);
router.post("/quiz/:id", quizController.findOneQuizPost);
router.get('/login', (request, response) => {
    if(request.session.connectedStudent) {
        response.render('login');
    } else {
        response.render('login');
    }
    
});

router.get('/signup', (request, response) => {
    const locals = "";
    response.render('signup',{locals});
});
router.get('/tag', (request, response) => {
    response.render('tag');
});
router.get('/tag/:id', tagsController.findOneTags);


router.post('/signup', userController.signUp);
router.post('/login', userController.login);

module.exports = router;