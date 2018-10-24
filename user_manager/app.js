var express = require('express')
var app = express()
var bodyParser = require('body-parser')

var port = 8000
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

users = new Array()

/** Stores the given user */
function storeUser(userName) {
  users.push({ name: userName })
}


app.get('/', (req, res) => {
  res.redirect('/users')
})


app.get('/users', (req, res) => {
  res.render('users', {
    users: users
  })
})

/** Creates an user received at the body and redirects*/
app.post('/user', (req, res) => {
  userName = req.body.name
  storeUser(userName)

  res.redirect('/users')
})


/** Returns an object showing a list of users and its length  */
app.get('/api/users', (req, res) => {
  res.json({ length: users.length, users: users })
})

/** Adds an username received at the body */
app.post('/api/user', (req, res) => {
  userName = req.body.name
  storeUser(userName)

  res.send("OK", 200)
})

app.listen(port, () => {
  console.log("App listening in port " + port)
})
