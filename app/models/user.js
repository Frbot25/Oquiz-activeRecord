const client = require('../database');

const bcrypt = require('bcrypt');

const { userSchema } = require('../schemas/userSchema');

class User {

    constructor(obj = {}) {
        for (const propName in obj) {
            this[propName] = obj[propName];
        }
    }
    async signUp(data) {
        try {
            
            const {email, password, username} = data;
            console.log('<<< Signup-je suis dans le model et je reçois -je vais le valider avec joi- ' ,data);
            // validation de joi
            const result = await userSchema.validate(data);
            console.log('\nSignup-resultat du validate de joi', result);
            if (result.error) {
                console.log("erreur dans le modèle",result.error.details);
                console.log("erreur details message: " ,result.error.message );
                const persError = result.error.message ;
                throw new Error(persError);     
            }
            // hash du password (obligatoire à cause de joi)
            let saltRounds = await bcrypt.genSalt(10);
            let HashedPassword = await bcrypt.hash(password, saltRounds);
            console.log("je hash le password", {HashedPassword});
            const {rows} = await client.query('INSERT INTO "user" (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *', [
                data.email,
                data.firstname,
                data.lastname,
                HashedPassword
            ]);
            console.log("\n voici le résultat",rows[0]);
                // creer un user pour securiser
                const userSecure = {
                id: rows[0].id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                createdAt: rows[0].createat
            }
            console.log("\n et mon user sécurisé qui va être renvoyé au controller", {userSecure});
            
            return userSecure;
            
  
        } catch (persError) {
            //voir l'erreur en console
           console.log("***\ndans le catch du model");
           //console.log(error.message);
            console.log(persError);
            //renvoyer l'erreur au front
            throw new Error(persError);
        }
    }
     //login
     async findUser() {
        try {
            console.log("les infos de login dans model", this.login);
            //comparer l'email de connexion avec la DB dans la table user
            console.log("** Coucou! Je suis findUser du model User.\nJe compare l'email envoyé par le client avec celui de la DB");
            const { rows } = await client.query(`SELECT * FROM "user" WHERE id=(SELECT id FROM "user" WHERE email = $1);`, [this.email]);//this vient du constructeur
            console.log(rows);
            //stocker l'id trouvé dans la table user
            const id = rows[0].id;
            console.log("J'ai trouvé le user" + id );
            //si pas de réponse => retourner l'erreur
            if (!rows[0].id) {
                console.log("les emails ne correspondent pas, je renvoie l'erreur au client sans préciser la cause pour des raisons de sécurité");
                throw new Error('Identification failed');
            }
            //vérifier que les mots de passe correspondent
            console.log("Maintenant je vérifie que les mots de passe correspondent\n...");
            const isValid = await bcrypt.compare(this.password, rows[0].password);
                if (!isValid) {
                    console.log("ce n'est pas bon, on renvoie une erreur au client sans préciser la raison par sécurité");
                    throw new Error('Identification failed');
                }
            console.log("vérif ok!\n");
            //si user voir s'il a des bookmarks
            //console.log('id trouvé dans la table user: ',id);
                let userSecure = {
                    id: rows[0].id,
                    firstname: rows[0].firstname,
                    lastname: rows[0].lastname,
                    email: rows[0].email,
                    createdAt: rows[0].created_at
                };
                console.log(userSecure);
                //renvoyer le user au controller            
                return userSecure;

                console.log(userSecure);
                //renvoyer le user au controller            
                return userSecure;
            

        } catch (error) {
            //voir l'erreur en console
            console.trace(error);
            //renvoyer l'erreur au front
            throw new Error(error.detail ? error.detail : error.message);
        }
    }
}

module.exports = User;