import * as dotenv from 'dotenv'
import { cleanEnv, port, url } from 'envalid'

import { AppConfig } from './types/appConfig'

dotenv.config()

export const env: AppConfig = cleanEnv(process.env, {
  FASTIFY_PORT: port({
    default: 8888
  }),
  FASTIFY_HOST: url({
    default: '0.0.0.0'
  }),
  MONGO_CONNECTION_STRING: url()
})
