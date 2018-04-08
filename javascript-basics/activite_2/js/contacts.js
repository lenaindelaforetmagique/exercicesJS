/*
Activité : gestion des contacts
*/

// Classe de Contact (nom + prénom)
var Contact = {
  init: function(nom, prenom) {
    this.nom = nom;
    this.prenom = prenom;
  },
  repr: function() {
    return (`Nom : ${this.nom}, prénom : ${this.prenom}`);
  }
};

// Objet répertoire (tableau de contacts + méthodes)
var Repertoire = {
  init: function() {
    this.contacts = [];
  },
  affiche: function() {
    console.log("Voici la liste de tous vos contacts :");
    this.contacts.forEach(function(contact) {
      console.log(contact.repr());
    });
    console.log("");
  },
  ajouteContact: function(nom, prenom) {
    var pers = Object.create(Contact);
    pers.init(nom, prenom);
    this.contacts.push(pers);
  }
}

function ajouterContact() {
  var nom = prompt("Entrez le nom du nouveau contact :");
  var prenom = prompt("Entrez le prénom du nouveau contact :");
  Repertoire.ajouteContact(nom, prenom);
  console.log("Le nouveau contact a été ajouté");
}


Repertoire.init();
Repertoire.ajouteContact("Lévisse", "Carole");
Repertoire.ajouteContact("Nelsonne", "Mélodie");

console.log("Bienvenue dans le gestionnaire de contacts !");

var choix = -1;
while (choix !== 0) {

  console.log("1 : Lister les contacts");
  console.log("2 : Ajouter un contact");
  console.log("0 : Quitter");
  console.log("");
  choix = Number(prompt("Choisissez une option :"));
  switch (choix) {
    case 1:
      Repertoire.affiche();
      break;
    case 2:
      ajouterContact();
      break;
    case 0:
      console.log("Au revoir !");
      break;
    default:
      console.log("Saisissez 0, 1 ou 2.");
      break
  }
}