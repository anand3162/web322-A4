/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Anand Krishna Anil Kumar Student ID: 152227229 Date: 10/20/2024
*
********************************************************************************/
const fs = require('fs');

const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

let sets = [];

// copy all the setData array and matching the theme_id in setData with themeData
function initialize() {
    return new Promise((resolve, reject) => { 
      try {
        sets = [];
        setData.forEach(set => { //iterate over each item in setData.
          const theme = themeData.find(theme => theme.id === set.theme_id)?.name || 'Unknown'; //search for the theme object in themeData that matches the current set’s theme_id
          sets.push({
            ...set, //copies all the properties of the current setData object.
            theme   //theme property is added using the theme name found from themeData.
          });
        });
        resolve();//should resolve with no data
      } catch (error) {
        reject("Initializing failed " + error.message);
      }
    });
  }

// returns the complete "sets" array
function getAllSets() {
    return new Promise((resolve, reject) => {
      if (sets.length > 0) {
        resolve(sets); //should resolve with the completed "sets" array
      } else {
        reject('No sets found.');
      }
    });
  }


// will return a specific "set" object from the "sets" array
  function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const matchedSet = sets.find(set => set.set_num === setNum);
      if (matchedSet) {
        resolve(matchedSet);
      } else {
        reject(`Set with number ${setNum} not found`);
      }
    });
  }

// The purpose of this function is to return an array of objects from the "sets" array whose "theme" value matches the "theme" parameter. 
// However, it is important to note that the "theme" parameter may contain only part of the "theme" string, and case is ignored.
function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const themeSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
      if (themeSets.length > 0) {
        resolve(themeSets);
      } else {
        reject(`No sets found for theme: ${theme}`);
      }
    });
  }

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme }
 
//test
initialize()
    .then(() => getAllSets())
    .then(sets => console.log(sets))
    .catch(error => console.error(error));

getSetByNum("1376-1")
    .then(set => console.log(set))
    .catch(error => console.error(error));

getSetsByTheme("Books")
    .then(sets => console.log(sets))
    .catch(error => console.error(error));