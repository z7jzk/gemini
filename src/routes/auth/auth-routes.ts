import { Router } from 'express'
import jetValidator from 'jet-validator'

import authRoutes from './auth-handlers'

const authRouter = Router(), validate = jetValidator()

authRouter.post('/login', validate('email', 'password'), authRoutes.login)
authRouter.get('/logout', authRoutes.logout)

export default authRouter