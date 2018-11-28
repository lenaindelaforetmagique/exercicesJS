// General functions
////////////////////
var removeDOMChildren = function(dom) {
  //removes all children of dom
  while (dom.firstChild) {
    dom.removeChild(dom.firstChild);
  };
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}


// Interactions with scriptNoel
///////////////////////////////
var showResult = function(hat) {
  var domParent = document.getElementById('resultat');
  removeDOMChildren(domParent);
  var lines = hat.resultLines();
  if (lines.length > 0) {
    lines.forEach(function(v) {
      var dom = document.createElement('p');
      dom.innerHTML = v;
      domParent.appendChild(dom);
    });
  } else {
    var dom = document.createElement('p');
    dom.innerHTML = " --";
    domParent.appendChild(dom);
  }
};

var showPersons = function(hat) {
  var domParent = document.getElementById('personnes');
  removeDOMChildren(domParent);
  if (hat.persons.length > 0) {
    hat.persons.forEach(function(v) {
      var dom = document.createElement('p');
      dom.innerHTML = v.toString();
      domParent.appendChild(dom);
    });
  } else {
    var dom = document.createElement('p');
    dom.innerHTML = " -- Ajoutez des personnes en cliquant sur le bouton --";
    domParent.appendChild(dom);
  }
}

var showLists = function(hat) {
  var doms = ["list1", "list2"];
  for (var i = 0; i < 2; i++) {
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

var addPerson = function(name) {
  hat.addPerson(name);
  _history.push(["addP", name]);
}

var addLink = function(i, j) {
  hat.addLink(i, j);
  _history.push(["addL", i, j]);
}


// History functions
////////////////////
var saveHistory = function() {
  localStorage["PaireNoelHistory"] = JSON.stringify(_history);
  console.log(localStorage["PaireNoelHistory"]);
}

var getSavedHistory = function() {
  var hist = [];
  var stored = localStorage["PaireNoelHistory"];
  if (stored) {
    hist = JSON.parse(stored);
  }
  return hist;
}

var playHistory = function(hist) {
  _history = []; // reset
  for (var i = 0; i < hist.length; i++) {
    if (hist[i][0] == "addP") {
      addPerson(hist[i][1]);
    } else if (hist[i][0] == "addL") {
      addLink(hist[i][1], hist[i][2]);
    }
  }
}

// Button functions
///////////////////
export var tirageBtn = function() {
  hat.findPerm()
  showHat(hat);
}

export var initBtn = function() {
  hat = new scriptNoel.Hat();
  _history = [];
  saveHistory();
  showHat(hat);
}

export var ajoutPersonneBtn = function() {
  var result = window.prompt("Saisissez le nom", "");
  if (result != "" && result != null) {
    addPerson(result);
    showHat(hat);
  }
}

export var ajoutLienBtn = function() {
  var doms = ["list1", "list2"];
  var i = document.getElementById("list1").selectedIndex;
  var j = document.getElementById("list2").selectedIndex;
  if (i >= 0 && j >= 0) {
    addLink(i, j);
  }
  showHat(hat);
}

var showHat = function(hat) {
  showResult(hat);
  showPersons(hat);
  showLists(hat);
  saveHistory();
}


// Run at start
///////////////
var hat = new scriptNoel.Hat();
var _history = [];
var hist = [];
let dataFileName = getQueryVariable("data");
if (!dataFileName) {
  hist = getSavedHistory();
  playHistory(hist);
  showHat(hat);
} else {
  // chargeJSON
  var request = new XMLHttpRequest();
  request.onload = function() {
    hist = request.response;
    if (!hist) {
      hist = [];
    }
    playHistory(hist);
    showHat(hat);
  }
  request.open('GET', dataFileName);
  request.responseType = 'json';
  request.send();
}