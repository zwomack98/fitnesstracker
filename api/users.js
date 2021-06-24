const { urlencoded } = require('express')
const express = require('express')
const userRouter = express.Router()
const { getAllUsers, getLogginUser } = require('../db')

userRouter.get('/', async (req, res, next) => {
  // get all users route

  try {
    throw new Error('BLEH! ERROR ATTACK!')
    let users = await getAllUsers()
    res.send(users)
  } catch (error) {
    next({ error: 'Bad input', message: 'CRASHED NOW' })
  }
})

userRouter.post('/login', async (req, res, next) => {
  // login and return logged in user
  const { username, password } = req.body

  try {
    if (!username || !password) {
      next({ error: 'Bad input', message: 'Missing Fields' })
      return
    }

    let user = await getLogginUser(username)

    if (!user) {
      next({ error: 'Bad input', message: '404 no user found' })
      return
    }

    if (user.password !== password) {
      next({ error: 'Bad input', message: 'Password is not right' })
      return
    }

    //   if ( password.length < 8) {
    //     next({ error: 'Bad input', message: 'Password too short' })
    //     return
    //   }

    delete user.password

    res.json({ user })
  } catch (error) {
    console.log(error)
    // send error back?
    next(error)
  }
})

userRouter.use((err, req, res, next) => {
  err.from = '/users'
  //   res.status(500).send('SPECIFIC ERRROR')
  next(err)
})

module.exports = userRouter