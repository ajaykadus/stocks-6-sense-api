require('dotenv').config()
import { EPERM } from 'constants';
import pgPromise from 'pg-promise'

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
} as any

const db = pgp(config)

export default db