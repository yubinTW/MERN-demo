import { cleanEnv, port, url } from 'envalid'
import * as dotenv from 'dotenv'
import { AppConfig } from './types/appConfig'

dotenv.config()

const env: AppConfig = cleanEnv(process.env, {
  FASTIFY_PORT: port({
    default: 8888
  }),
  MONGO_CONNECTION_STRING: url()
})

export { env }
