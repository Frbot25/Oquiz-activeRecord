# Vocabulaire précis pour un MCD

les rectangles s'appellent des **entités**  
il sont composés de plusieurs **attributs** listés dans le rectangle  
On doit indiqué un ou plusieurs attributs qui permettent d'identifier sans risque d'erreur un élément précis de cette entité : cet attribut est souligné et prend le nom de **discriminant**  
Dans le système, les entités sont liées les unes aux autres grâce à des patates appelées **associations**  
 On indiquera également les **cardinalités** pour chaque entité concernée par l'association

 Ces cardinalités peuvent prendre 3 valeurs :

- 0
- 1
- N

Auprès de chaque entité, on indiquera le nombre minimum (0 ou 1) et le nombre maximum (1 ou n) d'occurences de l'autre entité concernée par l'association

# Transformation du MCD pour obtenir un MLD puis une BDD

On va observer les cardinalités maximum d'une association entre 2 entités

- 1,1 : on va créer une clé étrangère dans l'entité où ça fait le plus de sens et le moins d'informations inutiles
- 1,N : on va créer une clé étrangère dans l'entité qui a 1 pour maximum
- N,N : cas un peu particulier, on est "obligé" d'ajouter une table supplémentaire pour gérer ce type d'association. Cette table de liaison va contenir des reférences vers les 2 entités