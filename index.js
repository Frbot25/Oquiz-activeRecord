require('dotenv').config();
const express = require('express');
const router = require('./app/router');
const app = express();
app.use(express.json());
app.set('view engine', 'ejs');
const port = process.env.PORT || 3000;
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
// on require express-session (qui permet de gérer les session)
const session = require('express-session');
// on utilie notre middleware de gestion de session
// qui nous donne acès dans notre Controllers à request.session
app.use(session({
    secret: 'mon password super secret', // utilisé pour encoder les cookies
    resave:true,
    saveUninitialized:true
}));
app.use((request, response, next) => {
    // si il y a une propriété connectedStudent dans ma session
    // (on a accès ici à request.session, qui correspond à notre objet associé à notre id, stocké côté serveur)
    // on ajoute une propriété connectedStudent à l'objet locals 
    console.log('info de request.session.connectedStudent dans le index', request.session?.connectedStudent);
    response.locals.connectedStudent = request.session.connectedStudent;
    // cette méthode est dans index.js, donc apellée pour TOUTES les requêtes
    // donc on aura la valeur locals.connectedStudent dans toutes les vues
    // puis on passe à la méthode suivante
    next();
});
app.use(router);

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});