var removeDOMChildren = function(dom) {
  //removes all children of dom
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  };
};


var showResult = function(hat) {
  var domParent = document.getElementById('resultat');
  removeDOMChildren(domParent);
  hat.resultLines().forEach(function(v) {
    var dom = document.createElement('p');
    dom.innerHTML = v;
    domParent.appendChild(dom);
  });
};

var showPersons = function(hat) {
  var domParent = document.getElementById('personnes');
  removeDOMChildren(domParent);
  hat.persons.forEach(function(v) {
    var dom = document.createElement('p');
    dom.innerHTML = v.toString();
    domParent.appendChild(dom);
  });
}

var showLists = function(hat) {
  var doms = ["list1", "list2"];
  for (i = 0; i < 2; i++) {
    var domParent = document.getElementById(doms[i]);
    var j = domParent.selectedIndex;
    removeDOMChildren(domParent);
    hat.persons.forEach(function(v) {
      var dom = document.createElement('option');
      dom.innerHTML = v.py_name;
      domParent.appendChild(dom);
    });
    domParent.selectedIndex = j;
  }
}

var showHat = function(hat) {
  showResult(hat);
  showPersons(hat);
  showLists(hat);

  saveHistory();
}

export var tirage = function() {
  hat.findPerm()
  showHat(hat);
}

export var init = function() {
  hat = new scriptNoel.Hat();
  _history = [];
  showHat(hat);
}

var addPerson = function(name) {
  hat.addPerson(name);
  _history.push(["addP", name]);
}

export var ajoutPersonne = function() {
  var result = window.prompt("Saisissez le nom", "");
  if (result != "" && result != null) {
    addPerson(result);
    showHat(hat);
  }
}

var addLink = function(i, j) {
  hat.addLink(i, j);
  _history.push(["addL", i, j]);
}

export var ajoutLien = function() {
  var doms = ["list1", "list2"];
  var i = document.getElementById("list1").selectedIndex;
  var j = document.getElementById("list2").selectedIndex;
  if (i >= 0 && j >= 0) {
    addLink(i, j);
  }
  showHat(hat);
}

var saveHistory = function() {
  localStorage["PaireNoelHistory"] = JSON.stringify(_history);
}

var playSavedHistory = function() {
  _history = [];
  var stored = localStorage["PaireNoelHistory"];
  // console.log("playHist", hist, typeof(hist), hist.length);
  var res = false;
  if (stored) {
    var hist = JSON.parse(stored);
    if (hist.length > 0) {
      for (var i = 0; i < hist.length; i++) {
        if (hist[i][0] == "addP") {
          addPerson(hist[i][1]);
        } else if (hist[i][0] == "addL") {
          addLink(hist[i][1], hist[i][2]);
        }
      };
      res = true;
    }
  }
  return res;
}

// -----------------
var hat = new scriptNoel.Hat();
var _history = [];

if (!playSavedHistory()) {
  var names = ["Lorraine", "Antoine", "Stéphane", "Xavier",
    "Jean-Baptiste", "Pierre-Hugues", "Elsa", "Emmanuelle"
  ];
  for (var i = 0; i < names.length; i++) {
    addPerson(names[i]);
  }
  for (var i = 0; i < 3; i++) {
    addLink(i, i + 5);
    addLink(i + 5, i);
  }
}

showHat(hat);