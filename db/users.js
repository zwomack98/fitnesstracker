const client = require('./client')

async function getAllUsers() {
  try {
    const { rows } = await client.query(`
        SELECT id, username FROM users;
    `)

    return rows
  } catch (error) {
    console.log('An error occurred inside getAllUsers')
    throw error
  }
}

async function getLogginUser(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT *
            FROM users
            WHERE username=$1;
        `,
      [username]
    )

    return user
  } catch (error) {
    console.log('An error occurred inside getAllUsers')
    throw error
  }
}

module.exports = {
  getAllUsers,
  getLogginUser,
}