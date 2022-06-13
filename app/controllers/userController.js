const { response } = require("express");
const User = require("../models/user");


const userController = {
    //S'enregistrer
    signUp: async (request, response) => {
        try {
            let data = request.body;
            //console.log('data password', data.password, 'data confirm', data.passwordConfirm)
            if (data.password === data.passwordConfirm) {
                console.log('Signup-request.body dans controller',data.rows);
            console.log("\n>>> signupController: j'envoie les infos envoyées par le client dans le modèle\n");
           
            dataModify = {
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password
            }
            const user = await new User().signUp(dataModify);
            response.render('index',{user});
            } else {
                const error = 'passwords no match !'
                const locals = response.locals;
                response.locals.error = locals
                response.render('signup', { locals})
            }
            
            
        } catch(error) {
            //lire l'erreur
            console.log("!!! Voici l'erreur dans le catch du controller: ",error.message);
            //console.trace(error);
            //envoyer l'info au front
            response.status(409).json(error);
           //response.status(500).json(error.message);
        }
    },
    //Renvoyer les infos user suite au login - ou une erreur
    login: async (request, response) => {
        try {
            //récupérer les infos de login dans le body
            const login = request.body;
            //authentification
            const user = await new User(login).findUser();
            const infoUser = {user};
            request.session.connectedStudent = infoUser;
            console.log('info de request.session.connectedStudent dans le controller', request.session.connectedStudent);
            response.render('login',{connectedUser: infoUser} );

        } catch (error) {
            //lire l'erreur
            //envoyer l'info au front
            response.status(500).json(error.message);
        }
    },
}
module.exports = userController;