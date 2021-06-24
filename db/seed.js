const { client, getAllUsers, getLogginUser } = require('./index')
const chalk = require('chalk')

async function buildDB() {
  try {
    console.log(chalk.magenta('Building DB'))

    client.connect()

    console.log(chalk.cyan('Connected to Client'))

    await dropTalbes()

    console.log(chalk.cyan('Dropped tables...'))

    await createTables()
    console.log(chalk.cyan('Added tables...'))

    await addUsers()
    console.log(chalk.cyan('Added users...'))

    await checkUserFunctions()
    console.log(chalk.green('Success! Closing ....'))
  } catch (error) {
    console.error(error)
  } finally {
    client.end()
  }
}

async function dropTalbes() {
  await client.query(`
        DROP TABLE IF EXISTS users;
    `)
}
async function createTables() {
  await client.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(50) NOT NULL
        );
    `)
}

async function addUsers() {
  let users = [
    {
      username: 'Travis',
      password: '123pass',
    },
    {
      username: 'Alan',
      password: 'helpDesk4You',
    },
    {
      username: 'Brett',
      password: 'shoeCollector42',
    },
    {
      username: 'Bob',
      password: 'burgerman67',
    },
  ]

  // for(let i = 0; i < users.length; i++) {
  //   const user = users[i]
  //   await client.query(
  //     `
  //           INSERT INTO users (username, password)
  //           VALUES ($1, $2)
  //       `,
  //     [user.username, user.password]
  //   )
  // }

  let createUserPromises = users.map(async (user) => {
    await client.query(
      `
            INSERT INTO users (username, password)
            VALUES ($1, $2)
        `,
      [user.username, user.password]
    )
  })
  console.log('---- users map ----', createUserPromises)
  await Promise.all(createUserPromises) // wait for all inserts to finish
}

async function checkUserFunctions() {
  let all = await getAllUsers()
  let user = await getLogginUser('Travis')
  let notLoggedIn = await getLogginUser('Not a real person', '123')

  console.log(all)
  console.log('--Single user-- \n', user)
  console.log('--Not logged in--\n', notLoggedIn)
}

buildDB()