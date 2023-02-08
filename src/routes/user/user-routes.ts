import { Router } from 'express'
import jetValidator from 'jet-validator'

import userRoutes from './user-handlers'
import User from '@src/models/User'

const userRouter = Router(), validate = jetValidator()

userRouter.get('/all', userRoutes.getAll)
userRouter.post('/add', validate(['user', User.instanceOf]),userRoutes.add)
userRouter.put('/update', validate(['user', User.instanceOf]), userRoutes.update)
userRouter.delete('/delete/:id', validate(['id', 'number', 'params']), userRoutes.delete)

export default userRouter