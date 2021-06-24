const express = require('express')
const apiRouter = express.Router()
const userRouter = require('./users')

apiRouter.get('/', (req, res, next) => {
  console.log('ENDPOINT IN APIROUTER')
  res.send('Success!')
})

apiRouter.use('/users', userRouter)

module.exports = apiRouter