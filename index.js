const express = require('express')
const app = express()
const morgan = require('morgan')
const chalk = require('chalk')

const { client } = require('./db')
client.connect()

// import API router
const apiRouter = require('./api')

// body parser and logging middleware
app.use(express.json())
app.use(morgan('tiny'))

// only get route so far
app.get('/', (req, res, next) => {
  console.log(chalk.cyan('Successfully reached "/" endpoint'))
  res.send('Success!')
})

app.use('/api', apiRouter)

app.use((err, req, res, next) => {
  console.log(err)
  res.status(500).send(err.message)
})

const PORT = 4000
app.listen(PORT, () =>
  console.log(chalk.magenta('Server Starting on port:', PORT))
)