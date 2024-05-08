const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.get('/user', (request, response) => {
  response.render('showUsers', {
    subject: 'Zeige alle nutzer',
    name: 'our template',
    link: 'https://google.com'
  });
});

app.get('/user/:xyz', (request, response) => {
  response.render('showUser', {
    subject: 'Zeige nur den Nutzer ' + request.params.xyz,
    name: 'our template',
    link: 'https://google.com'
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})