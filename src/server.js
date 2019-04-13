const knex = require('knex')
const app = require('./app')
const { PORT, DB_URL } = require('./config')


// make connection to database with KNEX
// define client and port
const db = knex({
  client: 'pg',
  connection: DB_URL,
})

// sets Knex connection to db in app so that it can be passed down to router then service.js
app.set('db', db)



app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`)
})
