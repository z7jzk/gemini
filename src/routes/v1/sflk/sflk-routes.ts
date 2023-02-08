import { Router } from 'express'
import jetValidator from 'jet-validator'

import sflkRoutes from './sflk-handlers'

const sflkRouter = Router(), validate = jetValidator()

sflkRouter.get('/test', sflkRoutes.test)
sflkRouter.get('/bom_data/:model', validate(['model', 'string', 'params']), sflkRoutes.getBomData)
sflkRouter.get('/bom_metadata/:model', validate(['model', 'string', 'params']), sflkRoutes.getBomMetadata)
sflkRouter.get('/business_units', sflkRoutes.getBusinessUnits)
sflkRouter.get('/model_years', sflkRoutes.getModelYears)
sflkRouter.get('/site_ids', sflkRoutes.getSiteIds)
sflkRouter.get('/product_lines', sflkRoutes.getProductLines)
sflkRouter.get('/model_list', sflkRoutes.getModelList)

export default sflkRouter