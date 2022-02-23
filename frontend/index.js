function createRequest() {
  var request = null;
  try {
    request = new XMLHttpRequest();
  } catch(ex) {
    console.log('Problema ao inicializar o objeto XmlHttpRequest...');
    try {
      request = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (ex2) {
      console.log('Problema ao inicializar o objeto ActiveXObject (Msxml2)...');
      request = new ActiveXObject("Microsoft.XMLHTTP");
    }
  }
  
  return request;
}

function calculateImcAPI(person, callback) {
  var req = createRequest();
  if (!req) return null;

  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        callback(JSON.parse(this.responseText));
      }
    }
  }
  var url = 'http://localhost:8080/imc/calculate';
  url = url + '?weight=' + person.getWeight();
  url = url + '&height=' + person.getHeight();

  req.open('GET', url, true);
  req.send();
}


function Person(height, weight) {
  if (typeof(height) !== 'number' || isNaN(height))
    throw Error('Height is not valid as a number...');
  if (typeof(weight) !== 'number' || isNaN(weight))
    throw Error('Weight is not valid as a number...');
  
  this._height = height;
  this._weight = weight;
  this.getHeight = function() {
    return this._height;
  }
  this.getWeight = function() {
    return this._weight;
  }
}

function Dietician(height, weight) {
  Person.call(this, height, weight);
  this.calculateImc = function(callback) {
    calculateImcAPI(this, callback);
  }
}
Dietician.prototype = Object.create(Person.prototype);
Dietician.prototype.constructor = Dietician;


function createDietician(inputHeight, inputWeight) {
  var height = parseFloat(inputHeight);
  var weight = parseFloat(inputWeight);
  
  return new Dietician(height, weight);
}

function calculateBuilder() {
  console.log('construindo a minha closure para manipulacao do evento de clique...');
  var heightElem = document.getElementById('height');
  var weightElem = document.getElementById('weight');
  var tbodyElem = document.getElementById('tbody-result');

  return function() {
    console.log('calculando o IMC utilizando os valores do escopo léxico...');
    var dietician = createDietician(heightElem.value, weightElem.value);
    dietician.calculateImc(function (resultado) {
      var imcElem = document.createElement("td");
      var descriptionElem = document.createElement("td");
      var trElement = document.createElement("tr");
      
      imcElem.innerHTML = resultado.imc;
      descriptionElem.innerHTML = resultado.description;

      trElement.append(imcElem);
      trElement.append(descriptionElem);

      tbodyElem.append(trElement);
    });
  }
}

window.onload = function(evt) {
  console.log('carreguei o conteúdo...');
  var btn = document.querySelector('div.form button');
  btn.addEventListener('click', calculateBuilder());
}

console.log('executei o script...');