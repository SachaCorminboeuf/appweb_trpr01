# TP01 - Gestionnaire de produits

> **Cours :** 420-W40-SF - Développement d’applications Web (Cégep de Sainte-Foy)  
> **Travail :** TP01 - Gestionnaire de produits  
> **Étudiant(e) :** Sacha Ostiguy Corminboeuf  
> **Dernière mise à jour :** 2026-03-08

## Récits utilisateurs

- **RU1** — En tant qu’utilisateur, je peux ajouter un nouveau produit.
- **RU2** — En tant qu’utilisateur, je peux modifier un produit existant.
- **RU3** — En tant qu’utilisateur, je peux dupliquer un produit existant pour en créer un nouveau rapidement.
- **RU4** — En tant qu’utilisateur, je peux supprimer un produit.
- **RU5** — En tant qu’utilisateur, je peux consulter la liste des produits.
- **RU6** — En tant qu’utilisateur, je peux rechercher un produit par son nom.
- **RU7** — En tant qu’utilisateur, je peux voir les détails d’un produit.
- **RU8** — En tant qu’utilisateur, je peux voir les quantités disponibles d’un produit.
- **RU9** — En tant qu’utilisateur, je peux être averti lorsqu’un produit atteint un stock critique.
- **RU10** — En tant qu’utilisateur, je peux exporter la liste des produits en CSV.

## Tableau des tâches

| ID | Priorité | Statut | Titre (tâche) | Relié à (RU#) | Critères d’acceptation (définition de done) | Notes / obstacles |
| --: | :------: | :----: | --- | :---: | --- | --- |
| A1 | MUST | Fait | Créer le formulaire d’ajout d’un item | RU1 | Le formulaire permet de saisir nom, prix, stock et description. | Structure de base complétée. |
| A2 | MUST | En cours | Ajouter la validation des champs du formulaire d’ajout | RU1 | Les champs obligatoires affichent un message d’erreur seulement lors du clic sur "Ajouter". | Il restait à faire la vérification des champs. |
| A3 | MUST | Fait | Générer automatiquement l’id d’un nouvel item | RU1 | L’id n’est pas saisi par l’utilisateur et est attribué automatiquement. | Utilisation de `Omit<Item, "id">`. |
| A4 | MUST | Fait | Créer la fonctionnalité de suppression d’un item | RU4 | Il est possible de supprimer un item sélectionné. |  |
| A5 | MUST | Fait | Ajouter une boîte de confirmation de suppression | RU4 | Une boîte de confirmation s’affiche avant la suppression définitive. | J’ai eu un peu de problème avec le deuxième niveau*. Ça m’a pris un moment à réaliser que je devais faire `emit` sur les deux niveaux d’enfants pour pouvoir avoir un composant unique pour la confirmation de suppression. |
| A6 | MUST | Fait | Gérer l’émission des événements entre composants pour la suppression | RU4 | Le composant enfant transmet correctement l’action au parent. | J’ai dû faire `emit` sur les deux niveaux d’enfants pour réutiliser un composant unique. |
| A7 | SHOULD | Fait | Ajouter un header et un footer | — | Un logo du site, un titre et un copyright sont visibles. |  |
| A8 | MUST | Fait | Afficher la liste des items dans un tableau | RU5 | La liste des produits est visible sous forme tabulaire. |  |
| A9 | MUST | Fait | Styliser le tableau des produits | RU5 | Les colonnes sont lisibles et les actions sont bien présentées. | Ajustement du layout des boutons sur 2 colonnes. |
| A10 | MUST | Fait | Ajouter l’affichage conditionnel du stock | RU5, RU8 | Le stock change de couleur selon la quantité disponible. | Rouge, jaune et vert selon les seuils. |
| A11 | MUST | Fait | Ajouter la vue détaillée d’un produit | RU7 | En cliquant sur "Voir les détails", une fenêtre affiche nom, prix, stock et description. |  |
| A12 | MUST | Fait | Créer le formulaire de modification d’un item | RU2 | Le bouton "Modifier" ouvre un formulaire prérempli avec les données du produit. |  |
| A13 | MUST | Fait | Sauvegarder les modifications d’un item | RU2 | Les données modifiées remplacent correctement celles de l’item existant. |  |
| A14 | MUST | Fait | Créer la fonctionnalité de duplication d’un item | RU3 | Le bouton "Dupliquer" ouvre un formulaire prérempli sauf pour l’id. |  |
| A15 | MUST | Fait | Sauvegarder un item dupliqué comme nouvel item | RU3 | Un nouvel item est ajouté à la liste avec un nouvel id. |  |
| A16 | SHOULD | Fait | Ajouter une barre de recherche dynamique | RU6 | Les résultats se mettent à jour instantanément selon le nom saisi. | La logique a été placée dans le composant parent avec `computed`. |
| A17 | MUST | Fait | Filtrer la liste des produits à partir de la recherche | RU6 | La liste affichée correspond au texte entré dans la barre de recherche. |  |
| A18 | SHOULD | Fait | Ajouter une alerte de stock critique | RU9 | Un message apparaît lorsqu’un produit passe sous le seuil critique. | Un message apparait quand le stock descent en dessous du seuil (4)|
| A19 | MUST | Fait | Créer le composant d’exportation CSV | RU10 | Un bouton permet de télécharger la liste des produits en format CSV. |  |
| A20 | MUST | Fait | Générer le contenu CSV à partir de la liste d’items | RU10 | Le fichier exporté contient les colonnes utiles et les données des produits. | Gestion de l’échappement des champs texte. |
| A21 | SHOULD | Fait | Ajouter les modales avec Teleport | RU2, RU3, RU4, RU7, RU9 | Les fenêtres modales s’affichent correctement au-dessus du reste de la page. | Réutilisé pour détails, modification, duplication et alerte. |
| A22 | SHOULD | En cours | Uniformiser la validation Bootstrap dans les formulaires | RU1, RU2, RU3 | Les erreurs sont affichées seulement après soumission dans ajout, modification et duplication. | Intégration en cours dans tous les formulaires. |
| A23 | SHOULD | À faire | Réviser la cohérence des seuils de stock critique | RU8, RU9 | Les seuils utilisés dans l’interface correspondent exactement à ceux demandés dans l’énoncé. | Important pour éviter une incohérence entre couleurs et alerte. |
| A24 | SHOULD | À faire | Faire une révision finale du déploiement GitHub Pages | — | L’application est accessible en ligne et le workflow de déploiement fonctionne. | L'application est accessible en ligne avec github pages |


    