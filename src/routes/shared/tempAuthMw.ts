import { Request, Response, NextFunction } from 'express'
 
import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes'
 
const jwtNotPresentErr = 'JWT not present in signed cookie.'
const userUnauthErr = 'User not authorized to perform this action'

async function validateAccess(req: Request, res: Response, next: NextFunction) {
  const jwt = req.header('api_key')
  // console.log(`API KEY SHOULD BE: ${process.env.API_KEY}`)
  // console.log(`API KEY RECEIVED: ${jwt}`)
  if (!jwt) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: jwtNotPresentErr })
  }
  if (jwt != process.env.API_KEY) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: userUnauthErr })
  }
  return next()
}

export default validateAccess