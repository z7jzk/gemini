import HttpStatusCodes from '@src/declarations/major/HttpStatusCodes'
import { RequestHandler } from 'express'

import { IReq, IRes } from '../../shared/types'
import { connection, connected } from '../../../config/database.config'

async function test(req: IReq, res: IRes) {
  console.log('hit sflk test')
  const test = 'hello world'
  return res.status(HttpStatusCodes.OK).json({ test })
}

const getBomData: RequestHandler = async function(req, res, next) {
  const model = req.params.model
  if (!model) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Model number missing from request' }) 
  const limit = req.query.limit || 50
  const offset = req.query.offset || 0

  const sql = `select 
    ENG_SEQ,
    ENG_SEQ_DESC,
    PARENT_PART_NUMBER,
    PARENT_PART_DESCRIPTION,
    PARENT_ITEM_TYPE,
    PART_NUMBER,
    PART_DESCRIPTION,
    ITEM_TYPE,
    QUANTITY_PER,
    UNIT_OF_MEASURE,
    VENDOR_NUMBER,
    VENDOR_NAME,
    BUYER_NAME,
    BUYER_NUMBER,
    COMMODITY_NUMBER,
    COMMODITY_CATEGORY,
    EFFECTIVE_DATE_FROM,
    EFFECTIVE_DATE_TO,
    COUNTRY_CODE,
    CURRENT_UNIT_COST,
    CURRENT_COST,
    ESTIMATED_COST,
    PART_PROJECT_NUMBER,
    PART_PROJECT_NAME,
    PART_PROJECT_MODEL_YEAR,
    PURCHASED_TYPE 
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
    where NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_NUMBER in ('${model}') 
    ORDER BY ENG_SEQ, PARENT_PART_NUMBER, PART_NUMBER 
    LIMIT ${limit} OFFSET ${offset}`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

const getBomMetadata: RequestHandler = async function(req, res, next) {
  const model = req.params.model
  const limit = 1
  const offset = 0

  const sql = `select 
    BUSINESS_UNIT,
    CHASSIS,
    MODEL_YEAR,
    PLATFORM,
    PRODUCT_LINE,
    COLOR,
    COLOR_TYPE,
    ENGINE,
    SITE_ID,
    MODEL_NUMBER,
    MODEL_DESCRIPTION,
    MODEL_PROJECT_NUMBER,
    MODEL_PROJECT_NAME 
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
    where NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_NUMBER in ('${model}') 
    LIMIT ${limit} OFFSET ${offset}`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

const getBusinessUnits: RequestHandler = async function(req, res, next) {
  const sql = `select distinct 
    BUSINESS_UNIT
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
    ORDER BY BUSINESS_UNIT`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

const getModelYears: RequestHandler = async function(req, res, next) {
  const sql = `select distinct 
    MODEL_YEAR
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
    ORDER BY MODEL_YEAR`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

const getSiteIds: RequestHandler = async function(req, res, next) {
  const sql = `select distinct 
    SITE_ID
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
    ORDER BY SITE_ID`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

const getProductLines: RequestHandler = async function(req, res, next) {
  const business_unit = req.query.business_unit
  const model_year = req.query.model_year
  const site_id = req.query.site_id
  if (!business_unit) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Business Unit missing from request' }) 
  if (!model_year) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Model Year missing from request' }) 
  if (!site_id) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Site ID missing from request' }) 

  const sql = `select distinct 
    PRODUCT_LINE 
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
    where NPI."PUBLIC".PLATFORMS_MODELS_PARTS.BUSINESS_UNIT in ('${business_unit}') and 
    NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_YEAR in ('${model_year}') and 
    NPI."PUBLIC".PLATFORMS_MODELS_PARTS.SITE_ID in ('${site_id}') 
    ORDER BY PRODUCT_LINE`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

const getModelList: RequestHandler = async function(req, res, next) {
  const business_unit = req.query.business_unit
  const model_year = req.query.model_year
  const site_id = req.query.site_id
  const product_line = req.query.product_line
  const platform = req.query.platform
  if (!business_unit) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Business Unit missing from request' }) 
  if (!model_year) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Model Year missing from request' }) 
  if (!site_id) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Site ID missing from request' }) 
  if (!product_line) res.status(HttpStatusCodes.BAD_REQUEST).send({ error: 'Product Line missing from request' }) 
  let platform_sql = ''
  if (platform) {
    let str = platform.toString()
    platform_sql = '%' + str.split(' ').join('%') + '%'
  }

  const sql = `select distinct NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_NUMBER,
      NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_DESCRIPTION,
      NPI."PUBLIC".PLATFORMS_MODELS_PARTS.PLATFORM,
      NPI."PUBLIC".PLATFORMS_MODELS_PARTS.COLOR,
      NPI."PUBLIC".PLATFORMS_MODELS_PARTS.COLOR_TYPE,
      NPI."PUBLIC".PLATFORMS_MODELS_PARTS.ENGINE,
      Count(Distinct NPI."PUBLIC".PLATFORMS_MODELS_PARTS.PART_NUMBER) as "Count_PART_NUMBER",
      PLATFORMS_MODELS_PARTS1.STANDARD_UNIT_COST 
    from NPI."PUBLIC".PLATFORMS_MODELS_PARTS 
      left outer join NPI."PUBLIC".PLATFORMS_MODELS_PARTS PLATFORMS_MODELS_PARTS1 on NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_NUMBER = PLATFORMS_MODELS_PARTS1.PART_NUMBER and NPI."PUBLIC".PLATFORMS_MODELS_PARTS.SITE_ID = PLATFORMS_MODELS_PARTS1.SITE_ID 
    where NPI."PUBLIC".PLATFORMS_MODELS_PARTS.SITE_ID = '${site_id}' 
      and NPI."PUBLIC".PLATFORMS_MODELS_PARTS.BUSINESS_UNIT = '${business_unit}'
      and NPI."PUBLIC".PLATFORMS_MODELS_PARTS.PRODUCT_LINE = '${product_line}' 
      and NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_YEAR = ${Number(model_year)} 
      and NPI."PUBLIC".PLATFORMS_MODELS_PARTS.PURCHASED_TYPE = 'Purchased' 
      ${platform_sql.length > 0 ? `and NPI."PUBLIC".PLATFORMS_MODELS_PARTS.PLATFORM ILIKE '${platform_sql}'` : ''} 
    group by NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_NUMBER, NPI."PUBLIC".PLATFORMS_MODELS_PARTS.MODEL_DESCRIPTION, NPI."PUBLIC".PLATFORMS_MODELS_PARTS.PLATFORM, NPI."PUBLIC".PLATFORMS_MODELS_PARTS.COLOR, NPI."PUBLIC".PLATFORMS_MODELS_PARTS.COLOR_TYPE, NPI."PUBLIC".PLATFORMS_MODELS_PARTS.ENGINE, PLATFORMS_MODELS_PARTS1.STANDARD_UNIT_COST`

  getDataFromSnowflake(sql).then((data: any) => {
    res.status(HttpStatusCodes.OK).json({ data })
  })
  .catch(err => {
    if (err == 0) {
      res.status(HttpStatusCodes.GATEWAY_TIMEOUT).send('Not connected to Snowflake database')
    } else {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({ error: err })
    }
  })
}

async function getDataFromSnowflake(sqlText: string): Promise<any> {  
  return new Promise ((resolve, reject) => {
    if (!connected) reject(0)
    connection.execute({
      sqlText: sqlText,
      complete: (err: any, stmt: any, rows: any) => {
        if (err) {
          reject(err.message)
        } else {
          resolve(rows)
        }
      }
    })
  })
}

export default {
  test,
  getBomData,
  getBomMetadata,
  getBusinessUnits,
  getModelYears,
  getSiteIds,
  getProductLines,
  getModelList
} as const