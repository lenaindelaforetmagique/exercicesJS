var stylo = {
    type: "bille",
    couleur: "bleu",
    marque: "Bic",
};

// console.log(stylo.type);
// console.log(stylo.couleur);
// console.log(stylo.marque);
// stylo.couleur = "rouge";
// console.log(stylo.couleur);
// stylo.prix = "2.4";
// console.log(stylo.prix);


var Personnage = {
    init: function(nom, sante, force) {
        this.nom = nom;
        this.sante = sante;
        this.force = force;
        this.xp = 0;
    },

    // Renvoie la description du personnage
    decrire: function() {
        var description =
            this.nom + " a " +
            this.sante + " points de vie et " +
            this.force + " en force et " +
            this.xp + " pts d'expérience."
        return description;
    }
};

var perso1 = Object.create(Personnage);
perso1.init("Jean", 12, 4);
console.log(perso1.decrire());

var perso2 = Object.create(Personnage);
perso2.init("Michel", 123, 3);
console.log(perso2.decrire());