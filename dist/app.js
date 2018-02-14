(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";

// function showPlanets(planetArray) {
//    console.log("show me some planets", planetArray);
// }

function populatePage(item, index) {
   //make a div to put the rendered html
   let newDiv = document.createElement("div");
   newDiv.innerHTML = itemGrid(item, index);
   document.getElementById("container").append(newDiv);
}

function showFilmList(val) {
   let output = `<li><a href="${val}">${val}</a></li>`;
   return output;
}

function itemGrid(item, index) {
   console.log("itemGrid");
   let filmArray = item.films;
   let filmList;

   filmArray.forEach((item) => {
      filmList = (filmList) ? filmList + showFilmList(item) : showFilmList(item);
      // ? is a ternary operator which is saying if this first statment is true then run the first call, if false run the second call; like a for each item in filmList concept: reads first run is fi the variable filmList is defined and has a item value then showFilmList(item)=== first time around evaluates to be false then if will do the last call. On the second loop the filmList variable now has an object and will evaluate to be true, therefore will take that item and add another showFilmList(item) === filmList + showFilmList(item). 
   });

   let output =
      `<section id="index--${index}" class="card-wrapper" style="border: 2px solid">
      <h3>Name: ${item.name}</h3>
      <h4>Planet featured in these films:</h4>
      <ul>
      ${filmList}
      </ul>
      <span><strong>Planet Terrain:</strong> ${item.terrain}</span>
      </section>`;
   return output;
}

module.exports = { populatePage };
},{}],2:[function(require,module,exports){
"use strict";

let dom = require("./dom-stuff");// no need to add js extension
let api_calls = {};
let base = "https://swapi.co/api"; // link to the base api you want to access
let planets = [];

// setter: sets value 
api_calls.getAllPlanets = () => {
    console.log("happy to get all planets");
    
    let planetXHR = new XMLHttpRequest(); 
    // makes a request to get api data and is expecting an action 

    planetXHR.addEventListener("load", function(){
        let data = JSON.parse(this.responseText); // parse into a JS object; responseText is property of the XMLHttpRequest method
        console.log("data in call", data);
        planets = data.results; // copy of the results are in this variable
        // show the planets require some dom-stuff.js
        // dom.showPlanets(planets);
        planets.map(dom.populatePage); //array method
    });

    // setter?
    planetXHR.addEventListener("error", function(){
        console.log("you have and error with teh XHR call - check spelling");
    });

    // getter
    planetXHR.open("GET", `${base}/planets`);
    planetXHR.send();
};
 // this method returns the variable; it gets the data
api_calls.getPlanets = () => {
    return planets;
};

module.exports = { api_calls };



},{"./dom-stuff":1}],3:[function(require,module,exports){
"use strict";

console.log("main is  in the house");

let db = require('./fetch-sw');

let button = document.getElementById("btn-planets");
button.addEventListener("click", db.api_calls.getAllPlanets);






},{"./fetch-sw":2}]},{},[3]);
