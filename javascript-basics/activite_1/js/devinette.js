/*
Activité : jeu de devinette
*/

// NE PAS MODIFIER OU SUPPRIMER LES LIGNES CI-DESSOUS
// COMPLETEZ LE PROGRAMME UNIQUEMENT APRES LE TODO

console.log("Bienvenue dans ce jeu de devinette !");

// Cette ligne génère aléatoirement un nombre entre 1 et 100
var solution = Math.floor(Math.random() * 100) + 1;

// Décommentez temporairement cette ligne pour mieux vérifier le programme
// console.log("(La solution est " + solution + ")");

// TODO : complétez le programme
console.log("Bienvenue dans ce jeu de devinette !");
var nb;
var trouve = false;
var cpt = 0;
while ((!trouve) && (cpt < 6)) {
    nb = Number(prompt("Nombre à essayer:"));
    cpt++;
    if (nb === solution) {
        trouve = true;
        console.log("Bravo ! La solution était " + solution);
        console.log("Vous avez trouvé en " + cpt + " essai(s)");
    } else if (nb > solution) {
        console.log(nb + " est trop grand");

    } else {
        console.log(nb + " est trop petit");
    }
}
if (!trouve) {
    console.log("Perdu... La solution était " + solution);
}