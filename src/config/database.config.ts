// library imports
import * as snowflake from 'snowflake-sdk'

// package config
snowflake.configure({ ocspFailOpen: false })

// @ToDo: setup as an app account rather than tying to an individual?
const snowflakeDatabase = {
  account: process.env.ACCOUNT || '',
  authenticator: process.env.AUTHENTICATOR || '',
  username: `${process.env.USERNAME}@polarisind.com` || '',
  password: process.env.PASSWORD || ''
}

let connection: snowflake.Connection
let connection_ID: string
let connected: boolean

export { connection, connected }

export function connect(): void {
  connection = snowflake.createConnection(snowflakeDatabase)

  if (!connection.isUp()) {
    connection.connect((err: any, conn: any) => {
      if (err) {
        console.error(`Unable to connect: ${err.message}`)
      } else {
        console.log('Successfully connected to Snowflake')
        connection_ID = conn.getId()
        connected = connection.isUp()
        console.log('connection status:', connection.isUp())
      }
    })
  }
}

export function disconnect(): void {
  connection.destroy((err: any, conn: any) => {
    if (err) {
      console.error(`Unable to disconnect: ${err.message}`)
    } else {
      console.log(`Disconnected connection with id: ${connection.getId()}`)
    }
  })
  connected = false
  connection_ID = ''
}

export function getConnection(): boolean {
  console.log(connection_ID)
  return connected
}