/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Anand Krishna Anil Kumar Student ID: 152227229 Date: 1/11/2024
*
* Published URL:https://web-322-a3-2ob8u8r5w-anands-projects-1ac7f41e.vercel.app/
*
********************************************************************************/


const legoData = require("./modules/legoSets");
const express = require('express');
var path = require('path');
const app = express();

const HTTP_PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get("/lego/sets", async (req,res)=>{    
  try {
    if (req.query.theme) {
      let legoSets = await legoData.getSetsByTheme(req.query.theme);
      res.render("sets",{sets: legoSets});
    }
    else {
      let legoSets = await legoData.getAllSets();
      res.render("sets",{sets: legoSets});
    }
  } catch(err) {
    res.render('404', {message: err});
  }
  
});

app.get("/lego/sets/:id", async (req,res)=>{
  try{
    let legoSet = await legoData.getSetByNum(req.params.id);
    res.render("set", {set: legoSet});
  }catch(err){
    res.render('404', {message: err});
  }
});

app.use((req, res) => {
  res.status(404).render('404', {message: "I'm Sorry, we're unable to find the page you were looking for (︶︹︺)"})
});

legoData.initialize().then(()=>{
  app.listen(HTTP_PORT, () => { console.log(`Server is running at http://localhost:${HTTP_PORT}`) });
});