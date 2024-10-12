
const express = require('express');
const legoData = require('./modules/legoSets'); 
const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


legoData.initialize()
  .then(() => {
    console.log('Lego sets have been initialized successfully.');


    app.get('/', (req, res) => {
      res.send('Assignment 2: Anand Krishna Anil Kumar - 152227229'); 
    });


    app.get('/lego/sets', (req, res) => {
      legoData.getAllSets()
        .then(sets => res.json(sets))
        .catch(err => res.status(500).send(err));
    });


    app.get('/lego/sets/num-demo', (req, res) => {
      const demoSetNum = 'Jan-01'; 
      legoData.getSetByNum(demoSetNum)
        .then(set => res.json(set))
        .catch(err => res.status(404).send(err));
    });

    app.get('/lego/sets/theme-demo', (req, res) => {
      const demoTheme = 'town'; 
      legoData.getSetsByTheme(demoTheme)
        .then(sets => res.json(sets))
        .catch(err => res.status(404).send(err));
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize lego sets:', err);
  });