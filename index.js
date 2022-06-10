require('dotenv').config();
const express = require('express');
const router = require('./app/router');

const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));
app.use(router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});