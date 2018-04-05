var nombre = Number(prompt("Entrez un nombre :"));
if (nombre > 0) {
    console.log(nombre + " est positif");
} else if (nombre < 0) {
    console.log(nombre + " est négatif");

} else {
    console.log(nombre + " est nul !");
}

/* Les tests d'égalité
 https://developer.mozilla.org/fr/docs/Web/JavaScript/Les_diff%C3%A9rents_tests_d_%C3%A9galit%C3%A9
=== égalité stricte
== égalité faible

*/

/* Mémento
=== !==
== !=
>= <
<= >
&& ||
!
*/


var meteo = prompt("Quel temps fait-il dehors ?");
switch (meteo) {
    case "soleil":
        console.log("Sortez en t-shirt");
        break;
    case "vent":
        console.log("Sortez en pull.");
        break;
    case "pluie":
        console.log("Sortez en blouson");
        break;
    case "neige":
        console.log("Restez au chaud !");
        break;
    default:
        console.log("Je n'ai pas compris !");
}