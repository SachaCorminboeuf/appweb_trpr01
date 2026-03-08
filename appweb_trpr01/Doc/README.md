> **Cours :** 420-W40-SF - Développement d’applications Web (Cégep de Sainte-Foy)  
> **Travail :** TP01 - Gestionnaire de produits  
> **Étudiant(e) :** {{ Sacha Ostiguy Corminboeuf }}
> **Repo GitHub :** {{ [URL du repo](https://github.com/SachaCorminboeuf/appweb_trpr01) }}
> **Déploiement (GitHub Pages) :** {{ [URL du site](https://sachacorminboeuf.github.io/appweb_trpr01/) }}
>
> ## 1) Description du projet
>
> Mon projet porte sur la vente d'items d'un jeu en ligne. Dans Path Of Exile 2, il y a un nombre incroyable d'item pour chacune des classes, il peut être difficile de mettre en vente les items que l'on voudrait vendre à d'autre joueur. J'ai pensé faire un site où la vente d'item serait beaucoup plus simple. Tous les items sont à la même place et il est plus facile de pouvoir vendre, acheter et magasiner des items pour le "build" de notre personnage. J'aimerais faire un site qui est facile d'utilisation pour les débutants mais qui a plus de personnalisation possible pour les adepts de POE2. Le public sible de ce projet est sans aucun doute les joueurs de Path of Exile 2 qui sont tannés de devoir recherché dans le clavardage du jeu pour les items qu'ils désirent ainsi que d'éviter que les joueurs qui désirent vendre leurs items aient à envoyer à répétition leur message dans le clavardage du jeu.
>
> ## 2) Fonctionnalités (récits utilisateurs)
>
> Je peux ajouter un nouveau produit.
> Je peux modifier un produit existant.
> Je peux dupliquer un produit existant pour en créer un nouveau rapidement.
> Je peux supprimer un produit.
> Je peux consulter la liste des produits.
> Je peux rechercher un produit par son nom.
> Je peux voir les détails d’un produit.
> Je peux voir les quantités disponibles d’un produit.
> Je peux être averti lorsqu'un produit est en rupture de stock.
> Je peux exporter la liste des produits en CSV.
>
> ## 3) Technologies utilisées
>
> J'ai utilisé vue.js 3. https://vuejs.org/
> J'ai aussi utilisé Bootstrap 5. https://getbootstrap.com/
> La dernière technologie que j'ai utilisé est perplexity https://perplexity.ai/
>
> ## 4) Installation et démarrage
>
> npm install
> npm run dev
> npm run build
>
> ## 5) Déploiement (GitHub Pages)
>
> https://sachacorminboeuf.github.io/appweb_trpr01/
>
> ## 6) Architecture et organisation du code
>
> J'ai organisé mon code selon 12 components, 2: header et footer qui sont directement dans App.vue et les 9 autres sont utilisé dans MainScreen et finalement MainScreen est aussi >utilisé dans App.vue. Mon code utilise dans le dossier scripts une interface item avec une liste d'item déjà intégrée.
>
> ## 7) Utilisation de l’IA (OBLIGATOIRE)
>
> AddItem.vue ligne 5 et 16.
> MainScreen.vue ligne 23
> DeleteConfirmation ligne 17-32
> ShowDetails.vue ligne 19-44
> SearchBar.vue ligne 6-15
> CSVDowload.vue ligne 8-39
> Ainsi que tout le css.
