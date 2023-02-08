import { Router } from 'express'
import jetValidator from 'jet-validator'

import adminMw from './shared/adminMw'
import validateAccess from './shared/tempAuthMw'
import authRouter from './auth/auth-routes'
import userRouter from './user/user-routes'
import testRouter from './test/test-routes'
import v1Router from './v1/v1'

const apiRouter = Router(), validate = jetValidator()

/* route definition and init */
apiRouter.use('/tests', testRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/users', adminMw, userRouter)
apiRouter.use('/v1', validateAccess, v1Router)

export default apiRouter