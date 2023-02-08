import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes'

import { IReq, IRes } from '../shared/types'

async function get(req: IReq, res: IRes) {
  console.log('hit test')
  const test = 'hello world'
  return res.status(HttpStatusCodes.OK).json({ test })
}

export default {
  get
} as const