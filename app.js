const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/user', (request, response) => {
  response.render('showUsers', {
    subject: 'Wetter',
    name: 'our template',
    link: 'https://google.com'
  });
});

app.get('/user/:id', (request, response) => {
  response.render('showUser', {
    subject: 'Wetter ' + request.params.id,
    name: 'our template',
    link: 'https://google.com'
  });
});

app.get('/', (req, res) => {
  res.render('showUsers', {
    subject: 'Wetter',
    name: 'our template',
    link: 'https://google.com'
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})