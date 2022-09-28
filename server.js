const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const PORT = process.env.PORT || 4000
require('./config/db.connection.js')
const controllers = require('./controllers')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, you have reached the Improvement Club backend')
})

app.use('/user', controllers.user)

app.listen(PORT, () => console.log('listening on PORT ' + PORT))