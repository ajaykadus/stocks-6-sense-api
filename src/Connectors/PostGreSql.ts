require('dotenv').config()
import { EPERM } from 'constants';
import pgPromise from 'pg-promise'

const pgp = pgPromise({ capSQL: true }); // Empty object means no additional config required
const isDev = process.env.NODE_ENV === 'dev'
const host = isDev ? process.env.POSTGRES_HOST_LOCAL : process.env.
POSTGRES_HOST
const user = isDev ? process.env.POSTGRES_USER_LOCAL : process.env.POSTGRES_USER
const password = isDev ? process.env.POSTGRES_PASSWD_LOCAL : process.env.POSTGRES_PASSWORD

const config = {
    host,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user,
    password
} as any

const db = pgp(config)

export default db