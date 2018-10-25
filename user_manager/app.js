const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const API_USERS = 'http://127.0.0.1:8080'

var port = 8080
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

/** Stores the given user */
async function storeUser(userName) {
  // Post to the user_database service so it is stored
  const newUser = { name: userName }
  await fetch(API_USERS + '/user', 
                {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(newUser) 
                })
}

async function getUsers() {
  // Get to the user_database service so the users are retrieved
  users = await fetch(API_USERS + '/users')
  return users
}


app.get('/', (req, res) => {
  res.send("<a href='/users'>Happy users list</a>")
})


app.get('/users', async (req, res) => {
  const usersRequest = await fetch(API_USERS + '/users')
  const users = await usersRequest.json()


  res.render('users', {
    users: users
  })
})

/** Creates an user received at the body and redirects*/
app.post('/user', async (req, res) => {
  userName = req.body.name
  await storeUser(userName)

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
