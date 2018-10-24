var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var port = 8000
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

users = new Array()

app.get('/', (req, res) => {
  res.redirect('/users')
})

app.get('/users', (req, res) => {
  res.render('users', {
    users: users
  })
})

app.post('/user', (req, res) => {
  userName = req.body.name
  users.push({ name: userName })
  res.redirect('/users')
})

app.listen(port, () => {
  console.log("App listening in port " + port)
})
