/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Anand Krishna Anil Kumar Student ID: 152227229 Date: 09/27/2024
*
********************************************************************************/

const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {

  return new Promise((resolve, reject) => {
    try {
      setData.forEach(set => {
        const theme = themeData.find(theme => theme.id === set.theme_id);
        if (theme) {
          const newSet = { ...set, theme: theme.name };
          sets.push(newSet);
        }
      });
      resolve(); 
    } catch (error) {
      reject("Error during initialization: " + error.message);
    }
  });
  }
  
  function getAllSets() {
    return new Promise((resolve, reject) => {
      if (sets.length > 0) {
        resolve(sets);
      } else {
        reject("No sets available");
      }
    });
  }

  function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const set = sets.find(set => set.set_num === setNum);
      if (set) {
        resolve(set);
      } else {
        reject(`Set with set_num ${setNum} not found`);
      }
    });
  }

  function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const filteredSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
      if (filteredSets.length > 0) {
        resolve(filteredSets);
      } else {
        reject(`No sets found with theme containing '${theme}'`);
      }
    });
  }

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };