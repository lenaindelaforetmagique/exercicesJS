// + concat
console.log("Bon" + "jour");
var chaine;
chaine = "Bon" + "jour";
console.log(chaine.length);
console.log(chaine.toLowerCase());
console.log(chaine.toUpperCase());

console.log(chaine.charAt(3));
console.log(chaine[3]);

function voyCpt(mot) {
    var cptVoy = 0;
    for (var i = 0; i < mot.length; i++) {
        if ("aeiouy".indexOf(mot[i]) > -1) {
            cptVoy++;
        }
    }
    console.log("Le mot %s contient %d voyelle(s)", mot, cptVoy);
}

function inverser(mot) {
    var newS = "";
    for (var i = mot.length - 1; i >= 0; i--) {
        newS += mot[i];
    }
    console.log("Le mot %s inversé devient : %s", mot, newS);
}

var mot = prompt("Saisissez un mot:");
voyCpt(mot);
inverser(mot);