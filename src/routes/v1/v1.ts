import { Router } from 'express'

import sflkRouter from './sflk/sflk-routes'

const v1Router = Router()

/* route definition and init */
v1Router.use('/sflk', sflkRouter)

export default v1Router