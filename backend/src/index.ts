import { startFastify } from './server'
import { env } from './config'
import { AppConfig } from './types/appConfig'

const appConfig: AppConfig = {
  FASTIFY_PORT: env.FASTIFY_PORT,
  MONGO_CONNECTION_STRING: env.MONGO_CONNECTION_STRING
}

startFastify(appConfig)
