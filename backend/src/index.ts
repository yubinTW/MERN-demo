import { env } from './config'
import { serverOf, serverStart } from './server'
import { AppConfig } from './types/appConfig'

const server = serverOf()

const appConfig: AppConfig = {
  FASTIFY_PORT: env.FASTIFY_PORT,
  FASTIFY_HOST: env.FASTIFY_HOST,
  MONGO_CONNECTION_STRING: env.MONGO_CONNECTION_STRING
}

serverStart(server)(appConfig)
  .then((server) => {
    server.log.info(`Start server successfully`)
  })
  .catch((error) => {
    console.log(`Failed to start server: ${error}`)
  })
