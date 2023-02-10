import { Router } from 'express'

import sflkRouter from './sflk/mysql-routes'

const v1Router = Router()

/* route definition and init */
v1Router.use('/mysql', sflkRouter)

export default v1Router