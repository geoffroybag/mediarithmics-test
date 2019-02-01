Il s'agit d'un "château" API :

Le château est constitué de pièces (rooms).
Chaque pièce possède :
    Des liens vers des coffres
    Des liens vers d'autres pièces

Les coffres sont vides ou remplis, la plupart sont vides

Le but de l'exercice est de trouver tous les coffres qui sont pleins (de les compter et de récupérer leurs liens) via un petit script nodejs / Typescript. Attention, si le script met plus d'une trentaine de minute à parcourir le château c'est qu'il reste des optimisations à faire.

Voici le lien vers l'entrée du château : (GET) http://castles.poulpi.fr/castles/1/rooms/entry
Voici un exemple de coffre (vide comme le montre le statut) : (GET) http://castles.poulpi.fr/castles/1/chests/736d0e26-9024-4e93-81b3-f0ae5c3cac52
