-- --------------------------------------------
-- Création des tables pour l'application oQuiz
-- --------------------------------------------

-- par convention, on nomme nos tables au singulier, en anglais, en minuscule et en snake_case
-- dans certains cas, on voudra utiliser un nom pour une table qui correspond à un mot-clé du langage : on DEVRA échapper ce nom avec des "" (typiquement le cas pour la table "user")

-- --------------------------------------------

-- On va sécuriser notre script en effectuant une transaction :

-- BEGIN;
-- nos requêtes de création
-- COMMIT;

-- les requêtes vont être "prédigérées" par postgres avant d'être envoyées au serveur (écriture sur le disque dur)
-- ainsi, en cas d'erreur, même à la dernière requête, la transaction entière va être annulée (c'est tout ou rien, pas de demi-mesure)
-- pas de risque que le fichier soit partiellement exécuté

-- début de transaction
BEGIN;

-- avant de créer les tables, par sécurité, pour pouvoir sereinement exécuter le script autant qu'on veut, on tente de les supprimer
DROP TABLE IF EXISTS "user", quiz, tag, "level", question, answer, quiz_has_tag; 

-- on est sûr que la BDD est propre, on peut commencer la création

-- pour tous nos champs id, nos clés primaires, on va utiliser le type SERIAL
-- ce type est un pseudo-type, un raccourci qui correspond en vrai à INTEGER NOT NULL qui va être relié à une table interne qui permet de l'incrémenter à chaque nouvel enregistrement
-- la "vraie" syntaxe serait 
-- id INTEGER NOT NULL DEFAULT nextval("<table>_id_seq"::regclass)

-- --------------------------------------------
-- table user
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    lastname TEXT,
    fisrtname TEXT
);

-- --------------------------------------------
-- table level
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS "level" (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);


-- --------------------------------------------
-- table tag
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS tag (
    id SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);


-- --------------------------------------------
-- table quiz
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS quiz (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    "description" TEXT,
    -- on définit la clé étrangère directement à la création de la table avec le mot-clé REFERENCES <table>(<champ>)
    -- par convention, ce champ est nommé <table>_<champ>
    user_id INT NOT NULL REFERENCES "user"(id)
);


-- --------------------------------------------
-- table question
-- --------------------------------------------

-- on ne peut pas créer directement la référence vers la bonne réponse : la table answer n'existe pas encore
-- on pourra rajouter cette info dans un 2ème temps, après la création de la table manquante

CREATE TABLE IF NOT EXISTS question (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    anecdote TEXT,
    wiki TEXT,
    quiz_id INT NOT NULL REFERENCES quiz(id),
    level_id INT NOT NULL REFERENCES "level"(id),
    answer_id INT
);

-- --------------------------------------------
-- table answer
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS answer (
    id SERIAL PRIMARY KEY,
    texte TEXT NOT NULL,
    question_id INT NOT NULL REFERENCES question(id)
);

-- les tables question et answer sont créées, on peut maintenant ajouter l'info de clé étrangère manquante sur la table question
ALTER TABLE question
    ADD FOREIGN KEY(answer_id) REFERENCES answer(id);


-- --------------------------------------------
-- table quiz_has_tag
-- --------------------------------------------

CREATE TABLE IF NOT EXISTS quiz_has_tag (
    quiz_id INT NOT NULL REFERENCES quiz(id),
    tag_id INT NOT NULL REFERENCES tag(id)
);


-- aucune erreur, envoi de la transaction complète au serveur
COMMIT;