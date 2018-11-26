var hat = new scriptNoel.Hat();

var removeDOMChildren = function(dom) {
  //removes all children of dom
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  };
};


var showResult = function(hat) {
  var domParent = document.getElementById('resultat');
  removeDOMChildren(domParent);
  var dom = document.createElement('p');
  dom.innerHTML = "<strong>Résultat du tirage :</strong>";
  domParent.appendChild(dom);
  hat.resultLines().forEach(function(v) {
    dom = document.createElement('p');
    dom.innerHTML = v;
    domParent.appendChild(dom);
  });
};

var showPersons = function(hat) {
  var domParent = document.getElementById('personnes');
  removeDOMChildren(domParent);
  var dom = document.createElement('p');
  dom.innerHTML = "<strong>Contenu du chapeau :</strong>";
  domParent.appendChild(dom);
  hat.persons.forEach(function(v) {
    dom = document.createElement('p');
    dom.innerHTML = v.toString();
    domParent.appendChild(dom);
  });
};

var showLists = function(hat) {
  var doms = ["list1", "list2"];
  var txt = ["Personne 1", "Personne 2"]
  for (i = 0; i < 2; i++) {
    var domParent = document.getElementById(doms[i]);
    removeDOMChildren(domParent);
    var dom = document.createElement('option');
    dom.innerHTML = txt[i];
    domParent.appendChild(dom);
    hat.persons.forEach(function(v) {
      dom = document.createElement('option');
      dom.innerHTML = v.py_name;
      domParent.appendChild(dom);
    });
  }
}


var showHat = function(hat) {
  showResult(hat);
  showPersons(hat);
  showLists(hat);
}

export var tirage = function() {
  hat.findPerm()
  showHat(hat);
}

export var init = function() {
  hat = new scriptNoel.Hat();
  showHat(hat);
}

export var ajoutPersonne = function() {
  var result = window.prompt("Saisissez le nom", "");
  if (result != "" && result != null) {
    hat.addPerson(result);
    showHat(hat);
  }
}

export var ajoutLien = function() {
  var doms = ["list1", "list2"];
  var i = document.getElementById("list1").selectedIndex - 1;
  var j = document.getElementById("list2").selectedIndex - 1;
  if (i >= 0 && j >= 0) {
    hat.addLink(i, j);
  }
  showHat(hat);
}

// -----------------

var names = ["Lorraine", "Antoine", "Stéphane", "Xavier",
  "Jean-Baptiste", "Pierre-Hugues", "Elsa", "Emmanuelle"
];

for (var i = 0; i < names.length; i++) {
  hat.addPerson(names[i]);
}

for (var i = 0; i < 3; i++) {
  hat.addLink(i, i + 5);
  hat.addLink(i + 5, i);
}

showHat(hat);





// tirage();