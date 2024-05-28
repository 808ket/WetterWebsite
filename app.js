const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

const historieRouter = require('./routes/histories');

app.use(express.static('public'));

app.use('/historie', historieRouter);

app.get('/', (req, res) => {
  res.render('showWeatherdata', {
    subject: 'Wetter'
  });
});

app.use((req, res) => {
  res.status(404).send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
