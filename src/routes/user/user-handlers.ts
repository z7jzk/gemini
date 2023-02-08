import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes'

import userService from '@src/services/user-service'
import { IReq, IRes } from '../shared/types'
import { IUser } from '@src/models/User'

/* Get all users */
async function getAll(_: IReq, res: IRes) {
  const users = await userService.getAll()
  return res.status(HttpStatusCodes.OK).json({ users })
}

/* Add one user */
async function add(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body
  await userService.addOne(user)
  return res.status(HttpStatusCodes.CREATED).end()
}

/* Update one user */
async function update(req: IReq<{user: IUser}>, res: IRes) {
  const { user } = req.body
  await userService.updateOne(user)
  return res.status(HttpStatusCodes.OK).end()
}

/* Delete one user */
async function _delete(req: IReq, res: IRes) {
  const id = +req.params.id
  await userService.delete(id)
  return res.status(HttpStatusCodes.OK).end()
}

export default {
  getAll,
  add,
  update,
  delete: _delete,
} as const