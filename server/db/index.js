import pg from 'pg'
const { Pool } = pg

import dbconfig from './dbconfig.js'

const pool = new Pool(dbconfig)

export default pool
