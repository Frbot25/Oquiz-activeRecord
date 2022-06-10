require('dotenv').config();
const express = require('express');


const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}));

app.use('/', (request, response) => {
    response.send('Hello world')
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});