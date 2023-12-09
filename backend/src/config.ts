import * as dotenv from 'dotenv'
import { cleanEnv, port, str } from 'envalid'

import { AppConfig } from './types/appConfig'

dotenv.config()

export const env: AppConfig = cleanEnv(process.env, {
  FASTIFY_PORT: port({
    default: 8888
  }),
  FASTIFY_HOST: str({
    default: '0.0.0.0'
  }),
  MONGO_CONNECTION_STRING: str()
})
