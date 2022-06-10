# Oquiz active Record
Pas de dataMapper, on code en Active Record !
## Refaire le MCD
- Correction des erreurs du fichier MCD, le mettre à l'identique du fichier SQL : "import_data.sql".
(Changer le nom de certaine attributs ou discriminants), nommer le MCD "MCD-correction".

## Le début du commencement
Pour commencer, il faut mettre en place la base de données !

Les choses à faire, dans l'ordre : 
- Créer un utilisateur PostgreSQL, nommé "oquiz", avec un mot de passe et les droits nécessaires.
- Créer une base de données nommée "oquiz", dont le propriétaire est l'utilisateur "oquiz".
- Créer les tables grâce au fichier "import_tables.sql".
- Importer les données grâce au fichier "import_data.sql".
- tester la connexion à la bdd.

On pourra ensuite se connecter à la BDD dans le code via l'url : `postgres://oquiz:oquiz@localhost/oquiz`

## Initialiser le projet avec NPM !
- Initialiser le projet avec npm.
- Installer les librairie ou framworks néscéssaire.
- Mettre en place le .gitignore et le .env

## création de la structure
- Créer un dossier "app" à la racine du projet.
- Créer dans le dossier app un dossier :
    - models
    - controllers
- Créer un fichier router.js dans le dossier app.
- créer un dossier public à la racine du projet.

## Installer un serveur Express
- Créer un fichier index.js
- coder le fichier index.js pour implémenter le serveur Express.
- Tester le serveur Express.

## Créer les fichiers pour utiliser les données
- créer les fichiers models en fonction du nom des classes :
    une classe par entité: "Answer", "Level", "Question", "Quizz", "Tag", et "User".

Dans chaque classe :

déclarer une propriété pour chaque champ de la table correspondante.
coder un constructor qui prend en paramètre un objet. Cet objet contient toutes les valeurs à recopier dans l'instance.
ne pas oublier d'exporter la classe !

<details>
<summary>un exemple ?</summary>

Le but, c'est d'arriver à faire ça : 
```js

const monTag = new Tag({
  name: "un super tag"
});
```

On devrait donc avoir un truc dans ce genre : 
```js
class Tag {
  constructor(obj) {
    this.name = obj.name;
  }
};
```
</details>

## Do not repeat yourself

Les propriétés `id`, `created_at` et `updated_at` sont présentes dans toutes les classes.

On va donc... les factoriser ! Et pour ce faire, on va utiliser l'héritage !

On va donc coder une class `CoreModel`, dans le même dossier que les autres, et toutes les classes vont _hériter_ de celle-ci : 
- Penser à exporter `CoreModel`.
- Penser à require `CoreModel` dans les autres fichiers.
- Penser à appeler le "constructeur parent" dans les constructeur des classes.

## Get/Set

Dans chaque classe, à commencer par `CoreModel`, coder un "getter" et un "setter" par propriété.

<details>
<summary>Un exemple </summary>

```js
class CoreModel {
  id;

  getId() {
    return this.id;
  };

  setId(value) {
    this.id = value;
  };
};
```
</details>

## Bonus : ne pas autoriser de valeurs absurdes

Dans les "setters", rajouter des tests pour vérifier que la donnée passée en argument est au moins du bon type.

<details>
<summary>Un exemple</summary>

```js
class CoreModel {
  id;

  setId(value) {
    if( typeof value !== 'number') {
      throw Error("CoreModel.id must be a number !");
      // on "lève" une erreur => ça arrête tout !
    }
    this.id = value;
  }
};
```
</details>

## Créer toutes les méthodes :
- dans models
- dans controller

En gros avoir un "CRUD".

## Créer les routes :
- Créer toutes les routes des méthodes du CRUD pour chaques entités du MCD.
- les tester.

