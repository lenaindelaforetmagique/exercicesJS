// // console.log(document.body.childNodes[5].childNodes[1]);
// var titresElts = document.getElementsByTagName("h2");
// for (var i = 0; i < titresElts.length; i++) {
//     console.log(titresElts[i]);
// }

// var merveillesElts = document.getElementsByClassName("merveilles");
// for (var i = 0; i < merveillesElts.length; i++) {
//     console.log(merveillesElts[i]);
// }

//
// console.log(document.getElementById("nouvelles"));
//
// // Tous les paragraphes
// console.log(document.querySelectorAll("p").length);
//
// // Tous les paragraphes à l'intérieur de l'élément identifié par "contenu"
// console.log(document.querySelectorAll("#contenu p").length);
//
// // Tous les éléments ayant la classe "existe"
// console.log(document.querySelectorAll(".existe").length);
//
// // Tous les éléments fils de l'élément identifié par "antiques" ayantla classe "existe"
// console.log(document.querySelectorAll("#antiques > .existe").length);
//
// // Le premier paragraphe
// console.log(document.querySelector("p"));


// console.log(document.getElementById("contenu").innerHTML);
// console.log(document.getElementById("contenu").textContent);

// L'attribut href du premier lien
console.log(document.querySelector("a").getAttribute("href"));
console.log(document.querySelector("a").href);
console.log(document.querySelector("ul").id);

if (document.querySelector("a").hasAttribute("target")) {
    console.log("Le premier lien possède l'attribut target");
} else {
    console.log("Le premier lien ne possède pas l'attribut target");
}