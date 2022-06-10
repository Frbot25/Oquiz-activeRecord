const {Router, request, response} = require('express');
const router = Router();

router.get("/", (request,response) => {
    response.send('Hello world');
})

module.exports = router;