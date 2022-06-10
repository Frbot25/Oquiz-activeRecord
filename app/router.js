const {Router, request, response} = require('express');
const router = Router();

const tagsController = require('./controllers/tagsController');

router.get("/", (request,response) => {
    response.render('index');
});

router.get("/tags", tagsController.findAllTags);
router.get('/login', (request, response) => {
    response.render('login');
});
router.get('/signup', (request, response) => {
    response.render('signup');
});
router.get('/tag', (request, response) => {
    response.render('tag');
});

module.exports = router;