// require pg
const { Client } = require('pg')
const client = new Client('http://localhost:5432/example-db')

module.exports = client