> **Cours :** 420-W40-SF - Développement d’applications Web (Cégep de Sainte-Foy)  
> **Travail :** TP01 - Gestionnaire de produits  
> **Étudiant(e) :** Sacha Ostiguy-Corminboeuf
> **Période :** 2026-02-20→ 2026-02-27
>
> Séance 1 — _2026-02-20_ (Durée : _2h50m_)
>
> **Objectif de la séance :**
> Bien commencer le travail pratique 1 avec une bonne structure de base ainsi que la création du projet sur visual Studio Code
>
> **Travail réalisé**
> J'ai initialiser le travail pratique 1. Pour commencer, j'ai regardé la vidéo de présentation du travail pratique, puis j'ai fais l'initialisation d'un nouveau projet sur Visual Studio Code. J'ai ensuite créé un nouveau repository sur Git Hub.
> J'ai ajouté masterjim@gmail.com comme collaborateur. J'ai ensuite créé le fichier README.md, j'ai aussi mis les balises en haur du document pour l'identification et ensuite
> j'ai mis les balises correspondantes pour bien débuter le projet. J'ai aussi fais la partie 1 du README : la description du projet.
> Puis, la création de backlog.md avec les balises en haut du document pour bien identifier. J'ai ajouté le tableau des tâches dans le fichier.
> Finalement j'ai créé le fichier journal.md et fais la séance 1 ainsi que les balises en haut pour l'identification du fichier.

Séance 2 - _2026-02-24_ (Durée : _1:50_)

**Objectif de la séance :**
Commencer l'affichage de l'application ainsi qu'entamer la partie logique.

**Travail réalisé**
J'ai commencé par la création des fichiers pour organiser mon project:Scripts et css.
Ensuite, j'ai procédé à l'entamation de la création de l'application avec la création du component MainScreen.vue et ShowItemList.vue.
J'ai aussi créé les components Footer et Header pour le copyright et l'affichage du logo et du nom du site respectivement.
Puis, j'ai créer item.ts pour avoir créer des items, j'ai ensuite créer 6 items que j'ai mis dans une liste d'items.
Pour aller plus en profondeur, dans ShowItemList, j'ai fais un bel affichage pour chacun des items que j'avais dans ma liste d'item puisse être affiché.
Par la suite, j'ai ajouté des boutons:Show details, delete, edit, duplicate à la fin de mon tableau d'affichage en préparation aux prochains récits utilisateurs.
Vers la fin du cours, j'ai commencé le formulaire pour pouvoir ajouter des items à la liste.

Séance 3 - _2026_02_27_ (Durée : _2:50_)

**Objectif de la séance :**
Finir la fonction d'ajout d'item, ajouté la fonction de suppresion et finalement ajouté la fonction pour montrer plus de détails.

**Travail réalisé**
Au début de la période, j'ai finis la fonctionnalité d'ajout d'items.
Puis, j'ai déplacé la fonctionnalité dans son propre component.
Ensuite, j'ai commencé la fonctionnalité pour la suppresion d'item avec l'utilisation d'un modal.
J'ai travaillé sur l'esthétique de l'application pour qu'elle soit vraiment dans le thème de POE2.
Finalement, j'ai fais et fini la fonctionnalité pour monter les détails d'un item encore une fois avec un modal.
J'ai eu un peu de difficulté avec la fonctionnalité dù au Parent-enfant-sous enfant.
À la fin du cours, j'ai fais la séance 2 et 3 de mon journal puisque j'avais oublié de faire la séance 2 le dernier cours.

Séance 4 - _2026_03_03_ (Durée: 1:50)

**Objectif de la séance :**
Commencé l'ajout de la fonctionnalité de modification et de dupplication d'un item.

**Travail réalisé**

J'ai fais tous le côté affichage du components EditItem avec les props et emit.
J'ai décidé d'utiliser des modals pour l'affichage de la modification et la dupplication parce que je trouvais que c'était une bonne idée que l'utlisateur devait absolument traité
sois la dupplication et la modification directement sans avoir accès au reste du site.
Il reste juste à finir la fonction pour l'instant elle ne fonctionne pas.
Ensuite, j'ai aussi fais tous le côté affichage de la dupplication d'item dans le components duplicateItems. La fonction n'a pas encore été faite.
J'ai rajouté le nom de l'item dans la confirmation de suppresion (avant seulement le id).
J'ai ajouté les fonctions pour les modals pour dupplicate et edit dans MainScreen.
Finalement j'ai fais les fonctions pour la modification et la dupplication dans MainScreen.vue.

Séance 5 _2026_03_06_ (Durée: 2:50)

**Objectif de la séance :**
Ajouté la fonctionnalité pour le stock qui est bas, ajouté le téléchargement CSV, la barre de recherche et finir la dupplication et la modification.

**Travail réalisé**
J'ai commencé par finaliser la fonctionnalité de dupplication et de moddification d'items.
Ensuite, j'ai ajouté un formulaire à la dupplication et non seulement juste un ajout identique avec un nouvel id.
J'ai travaillé sur l'affichage des bouttons pour que tous les bouttons soient droit.
J'ai décidé d'utiliser 4 différentes couleurs de bouton avec chaqun leur utilité. Le rouge pour la suppresion, le vert pour voir plus de détail puisque qu'il est possible de cliqué sans aucune conséquences, le jaune pour la modification puisque l'item se modifie mais ne se supprime pas donc conséquences mineures et finalement le bleu pour la dupplication puisque c'est une couleur qui allait bien avec le reste des couleurs tout en gardant peu de conséquences si utilisé.
J'ai ajouté dans la liste et dans le plus de détails la couleur de la boîte et du texte du stock dépendament de la quantité qu'il reste.
J'ai ajouté une alerte quand le stock d'un item descent en bas de 4.
J'ai décidé d'utiliser une alerte de bootstrap pour que l'utilisateur soit avertis et qu'il soit impossible que la notification soit ignorées.
J'ai ensuite ajouté la possibilité de faire le téléchargement de la liste d'item en CSV.
J'ai ajouté la possibilité de faire une recherche en temps réel.
Finalement, j'ai fais le déployment de l'application sur github pages.
J'ai eu de la difficulté avec le déployment de l'application. Au début, je pensais que c'était dû à la mauvaise base dans le dossier vite.config.ts. Mais après quelques tests j'ai réaliser que le déployment ne se lançais jamais puisque mon dossier .github était à l'intérieur du dossier appweb_tpr01 au lieux d'être à la racine du projet.
