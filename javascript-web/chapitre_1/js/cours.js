// var h = document.head;
// console.log(h);
//
// var b = document.body;
// console.log(b);

if (document.body.nodeType === document.ELEMENT_NODE) {
    console.log("Body est un noeud élément");
} else {
    console.log("Body est un noeud textuel");
}
var bchildNodes = document.body.childNodes;
// console.log(bchildNodes);
for (var i = 0; i < bchildNodes.length; i++) {
    console.log(bchildNodes[i]);
    console.log(bchildNodes[i].parentNode);
}
console.log(document.parentNode);