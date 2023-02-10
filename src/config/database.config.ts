// library imports
import * as snowflake from 'snowflake-sdk'
import * as mysql from 'mysql'
import { createConnection } from 'mysql'

// package config
snowflake.configure({ ocspFailOpen: false })

// @ToDo: setup as an app account rather than tying to an individual?
const snowflakeDatabase = {
  account: process.env.ACCOUNT || '',
  authenticator: process.env.AUTHENTICATOR || '',
  username: `${process.env.USERNAME}@polarisind.com` || '',
  password: process.env.PASSWORD || ''
}

const mysqlDatabase = {
  port: Number(process.env.DB_PORT) || 0,
  host: process.env.DB_HOST || '',
  user: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || ''
}

let connection: mysql.Connection
let connection_ID: string
let connected: boolean

export { connection, connected }

export function connect(): void {
  connection = createConnection(mysqlDatabase)

  // if (connection.state) {
    connection.connect((err: any, conn: any) => {
      if (err) {
        console.error(`Unable to connect: ${err.message}`)
      } else {
        console.log('Successfully connected to MySQL')
        connected = true
        console.log(`connection status: ${connection.state}`)
      }
    })
  // }
}

export function disconnect(): void {
  connection.destroy()
  connected = false
  connection_ID = ''
}

export function getConnection(): boolean {
  console.log(connection_ID)
  return connected
}