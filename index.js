
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/bloglists')

const mongoUrl = 
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose 
  .connect(mongoUrl)
  .then ( () => {
    console.log('connected to database', mongoUrl)

  })
  .catch( error => {
    console.log(error)
  })

  app.use(cors())
  app.use(bodyParser.json())
  app.use(express.static('build'))


  app.use('/api/blogs/', blogsRouter)

  
  const PORT = process.env.PORT || 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })