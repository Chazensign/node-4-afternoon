require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCont = require('./controllers/swagController')
const authCtrl = require('./controllers/authController')
const cartCtrl = require('./controllers/cartController')
const searchCtrl = require('./controllers/searchController')

const {SERVER_PORT, SESSION_SECRET} = process.env


const app = express()

app.use(express.json())
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESSION_SECRET
}))
app.use(checkForSession.checkForUser)
app.use(express.static(`${__dirname}/../build`))

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.getUser)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)

app.get('/api/swag', swagCont.read)
app.get('/api/search', searchCtrl.search)


app.listen(SERVER_PORT, () => console.log(`Self destruct in ${SERVER_PORT}`))