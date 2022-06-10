const {Router, request, response} = require('express');
const router = Router();

const tagsController = require('./controllers/tagsController');
const quizController = require('./controllers/quizController');

router.get("/", quizController.findAllQuiz);

router.get("/tags", tagsController.findAllTags);
router.get("/quiz/:id", quizController.findOneQuiz);
router.get('/login', (request, response) => {
    response.render('login');
});

router.get('/signup', (request, response) => {
    response.render('signup');
});
router.get('/tag', (request, response) => {
    response.render('tag');
});


router.post('/signup', (request, response) => {
    response.render('login');
});
router.post('/login', (request, response) => {
    response.render('index');
});

module.exports = router;