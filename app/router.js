const {Router, request, response} = require('express');
const router = Router();

const tagsController = require('./controllers/tagsController');

router.get("/", (request,response) => {
    response.send('Hello world');
});
router.get("/tags", tagsController.findAllTags);

module.exports = router;