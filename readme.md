# Créez un réseau social d’entreprise
### Groupomania - Construire un réseau social interne pour les employés
_(Projet 7 - Formation en Web Développement - Openclassrooms)_

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/powered-by-coffee.svg)](http://forthebadge.com)

## Scénario

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, vient de signer un nouveau contrat avec Groupomania, un groupe spécialisé dans la grande distribution, et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a imaginé plusieurs fonctionnalités pour favoriser les échanges entre collègues.


### Aspect Graphique

● Police d'écriture : tous les textes du site doivent utiliser la police Lato.

● Couleurs : 

    ● Primaire : #FD2D01

    ● Secondaire : #FFD7D7

    ● Tertiaire : #4E5166

● Responsive desktop, tablette, mobile

● Ne pas se lancer dans quelque chose de trop compliqué pour cette première version.

### Côté Technique

● Mettre en place backend, frontend et base de données.

● Coder en javascript et respecter les standards WCAG.

● Utilisation obligatoire d'un framework frontend Javascript.

● `Une page de connexion` : permettant à un utilisateur de se connecter ou de créer un compte s'il n'en possède pas déjà un. Un utilisateur doit avoir la possibilité de se déconnecter, la session utilisateur doit pouvoir persister pendant la connexion et les données de connexion doivent être sécurisées.

● `Une page d'accueil` : liste les posts créés par les différents utilisateurs, de manière antéchronologique.

● `Création d'un post` : un utilisateur doit pouvoir créer un post. Un post doit pouvoir contenir du texte et une image. Enfin, un utilisateur doit pouvoir modifier ou supprimer ses posts.

● `Système de like` : un utilisateur doit pouvoir liker un post, une seule fois pour chaque post.

● `Rôle administrateur` : dans le but de pouvoir faire de la modération si nécessaire, il faudra créer un utilisateur administrateur” ; celui-ci aura les droits de modification / suppression sur tous les posts du réseau social.

## Mise en route de l'application

1) `Cloner le Repository` : `git clone https://github.com/Karvaneg/OC_P7.git`
2) Dans le terminal de commande, depuis le dossier `frontend`, taper `npm install` puis `npm start`.
3) Dans le dossier `backend`, renommer le fichier `.env.example` en `.env` et y mettre vos variables d'environnement.
4) Dans le terminal de commande, depuis le dossier `backend`, taper `npm install` puis `node server` ou `nodemon server`.
5) L'application sera lancée sur `http://localhost:3000`.
6) Le `backend` tourne sur le port `8000`.

## Compétences évaluées


* Authentifier un utilisateur et maintenir sa session

* Développer l’interface d’un site web grâce à un framework front-end

* Implémenter un stockage de données sécurisé en utilisant une base de données


## Evaluation

___Évaluation___ : Mardi 15 novembre 2022
#### -> `Projet Validé `


### Remarques sur l'évaluation

#### 1. Authentifier un utilisateur et maintenir sa session

 __-> Validé.__

___Commentaire :___ 

L’application web se connecte et se déconnecte de l’application backend et l’application web est persistante pendant le temps de connexion.


#### 2. Développer l’interface d’un site web grâce à un framework front-end

 __-> Validé.__

___Commentaire :___

L’application peut être clonée et exécutée sans problème.

L’application a été développée avec le Framework React et fonctionne sans bug.

L’application web contient le logo et les couleurs recommandées par le client. Il n’y a aucune erreur d’accessibilité et aucun problème de contraste sur les pages testées.

Les Posts sur la page d’accueil s’affichent bien et dans l’ordre antéchronologique.


#### 3. Implémenter un stockage de données sécurisé en utilisant une base de données

  __-> Validé.__

___Commentaires :___

L’application backend utilise une base de données MongoDB et permet de faire des enregistrements et des modifications de données sous l’action des utilisateurs.

Les paramètres de connexion des utilisateurs sont cryptés avec bcrypt avant d’être stockés dans la base de données.

La base de données stocke les informations de l’utilisateur et les posts effectués par les utilisateurs. La base de données prend en compte les likes effectués sur des Posts par les utilisateurs.

Un administrateur peut effectuer la modification ou la suppression sur tous les Posts.

Les méthodes de sécurités additionnelles ont été ajoutées avec helmet, email-validator, password-validator, mongoose-unique-validator et jesonwebtoken.


### Livrables

___Points forts___ : 

1. Projet bien structuré, code source bien indenté.
2. Application bien fonctionnelle sans bug.
3. Bonne gestion des doublons sur le champ email dans le schéma de données.
4. Bonne implémentation des méthodes de sécurités recommandées.
5. API bien fonctionnelle sans erreur dans la console du serveur.
6. Pas de problème d’accessibilité ou de contraste. Bon respect des règles de WCAG.
7. Bonne gestion de la mémoire en supprimant l’image du post en cas de modification ou de suppression du post.
8. Bonne gestion de vérification d’accès à un Post avant toute modification ou suppression.
9. Le fichier README a été bien documenté et explique comment déployer le projet.

___Axes d'amélioration___ : 

1. Un utilisateur peut enregistrer plusieurs likes sur le même post en contournant la sécurité implémentée sur le frontend.
2. La modification ou la suppression du Post est conditionnée par la suppression de l’image.
3. Le compteur de redirection traverse 0 et continu sur des chiffres négatifs (après inscription).


### Soutenance

__Remarques :__ 

Très bonne présentation, bonne organisation et bonne prise de parole.

La présentation prend en compte les attentes fonctionnelles et techniques du projet. L’application respecte toutes les exigences fonctionnelles, de sécurités et d’accessibilités recommandées.

Félicitations !

____

## Ressources utilisées

* [React](https://fr.reactjs.org/) - Une bibliothèque JavaScript pour créer des interfaces utilisateurs.
* [Node.js®](https://nodejs.org/fr/) - Environnement d’exécution JavaScript construit sur le moteur JavaScript V8 de Chrome.
* [Mongoose](https://mongoosejs.com/) - Bibliothèque de programmation orientée objet JavaScript qui crée une connexion entre MongoDB et l'environnement d'exécution JavaScript Node.js.
* [MongoDB Atlas Database](https://www.mongodb.com/) - Système de gestion de base de données orienté documents
* [Postman](https://www.postman.com/) - Application permettant de tester des API
* [Visual Studio Code](https://code.visualstudio.com/) - Editeur de codes

## Auteurs

* **Marie Le Carvennec** _alias_ [@karvaneg](https://github.com/Karvaneg)