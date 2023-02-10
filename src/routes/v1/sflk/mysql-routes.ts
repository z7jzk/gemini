import { Router } from 'express'
import jetValidator from 'jet-validator'

import mysqlRoutes from './mysql-handlers'

const mysqlRouter = Router(), validate = jetValidator()

mysqlRouter.get('/test', mysqlRoutes.test)
// mysqlRouter.get('/bom_data/:model', validate(['model', 'string', 'params']), mysqlRoutes.getBomData)
mysqlRouter.get('/get_test', mysqlRoutes.getTest)

export default mysqlRouter