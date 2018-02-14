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


