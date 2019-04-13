require('dotenv').config()
const express = require('express')
const morgan = require('morgan') // logger
const cors = require('cors') 
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const validateBearerToken = require('./validate-bearer-token')
const errorHandler = require('./error-handler')
const bookmarksRouter = require('./bookmarks/bookmarks-router')



// creates express application object and provides access to other express objects (i.e. req,res, router)
const app = express() 

// set up middleware (order matters)
app.use(morgan((NODE_ENV === 'production') ? 'tiny' : 'common', {
  skip: () => NODE_ENV === 'test'
}))
app.use(cors())
app.use(helmet())
app.use(validateBearerToken)

// router matches the path then the CRUD function sent by HTTP request (or vice versa)
// router will then call on service.js to take care of CRUD work with database using KNEX
app.use(bookmarksRouter)


app.get('/', (req, res) => {
  res.send('Hello, world!')
})


// error handler middleware goes last
app.use(errorHandler)

module.exports = app
