const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL

let pool
if (!global._pgPool) {
  pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })
  global._pgPool = pool
} else {
  pool = global._pgPool
}

module.exports = pool
