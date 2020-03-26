import { createPool } from 'mysql2/promise'
import { config } from '../config'

export const connect = async () => {
  const connection = await createPool({
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName,
    // @ts-ignore
    port: config.dbPort,
    connectionLimit: 10
  })
  return connection
}