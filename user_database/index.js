const express = require('express')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const bodyParser = require('body-parser')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Setup database
db.defaults({ users: [{ "name":"default user" }, { "name": "default user 2" } ]}).write()

const port = 8080
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


function getUsers() {
  const users = db.get('users')
  console.log("Retrieved users " + users.value)
  return users.value()
}

function storeUser(userName) {
  db.get('users').push({ name: userName }).write()
  console.log("Stored user " + userName)
}

app.get('/users', (req, res) => {
  const users = getUsers()
  res.json(users)
})

app.post('/user', (req, res) => {
  const username = req.body.name
  storeUser(username)
  res.status(200).send("ok")
})

app.listen(port, () => {
  console.log("Listening on port " + port)
})
