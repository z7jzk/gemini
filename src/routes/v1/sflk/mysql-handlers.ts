import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes'
import { RequestHandler } from 'express'

import { IReq, IRes } from '../../shared/types'
import { connection, connected } from '../../../config/database.config'

async function test(req: IReq, res: IRes) {
  console.log('hit mysql test')
  const test = 'hello world'
  return res.status(HttpStatusCodes.OK).json({ test })
}

const getTest: RequestHandler = async function(req, res, next) {
  // const business_unit = req.query.business_unit
  // if (!business_unit) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Business Unit missing from request' }) 

  const sql = `SHOW TABLES;`

  getDataFromMySQL(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

async function getDataFromMySQL(sqlText: string): Promise<any> {  
  return new Promise ((resolve, reject) => {
    if (!connected) reject(0)
    connection.query(sqlText, (err, rows, fields) => {
      if (err) {
        reject(err.message)
      } else {
        resolve(rows)
      }
    })
  })
}

export default {
  test,
  getTest
} as const