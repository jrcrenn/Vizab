## Démarrage

Pour démarrer le serveur de développement, exécutez :

`npm install` 

puis

`npm run dev` 

Cela lancera l'application à l'adresse `http://localhost:5173`.

## Structure du projet

Voici un aperçu de la structure du projet :

-   `public/` : Contient les fichiers statiques.
-   `src/` : Contient le code source de l'application.
    -   `assets/` : Contient les ressources comme les images, les styles, etc.
    -   `components/` : Contient les composants Vue réutilisables.
    -   `service/` : Contient les services pour l'interaction avec les API ou autres sources de données.
    -   `views/` : Contient les vues de l'application.
    -   `App.vue` : Composant racine de l'application.
    -   `main.js` : Point d'entrée de l'application.
-   `tests/` : Contient les tests de l'application.

## Scripts disponibles

Dans ce projet, vous pouvez exécuter les scripts suivants :

-   `npm run dev` : Démarre le serveur de développement.
-   `npm run test` : Exécute les tests de l'application.
