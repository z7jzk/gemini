import { Router } from 'express'
import testRoutes from './test-handlers'

const testRouter = Router()

testRouter.get('/', testRoutes.get)

export default testRouter