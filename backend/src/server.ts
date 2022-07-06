import fastify, { FastifyInstance } from 'fastify'
import FastifyStatic from '@fastify/static'
import FastifyCors from '@fastify/cors'
import path from 'path'
import { establishConnection } from './plugins/mongodb'
import { TodoRouter } from './routes/todo'
import { AppConfig } from './types/appConfig'

const listenAddress = '0.0.0.0'

const startFastify = async (appConfig: AppConfig) => {
  const server: FastifyInstance = fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      },
      level: 'debug'
    }
  })

  if (!!appConfig.MONGO_CONNECTION_STRING) {
    try {
      await establishConnection(appConfig.MONGO_CONNECTION_STRING)
      server.log.info(`Mongo connect successfully`)
    } catch (error) {
      server.log.fatal(`Failed to connecto mongodb: ${error}`)
      throw new Error(`${error}`)
    }
  }

  server.register(FastifyCors, {})

  server.register(FastifyStatic, {
    root: path.join(__dirname, '../../frontend/build'),
    prefix: '/'
  })

  server.get('/ping', async (request, reply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  server.register(TodoRouter, { prefix: '/api' })

  const fastifyConfig = {
    port: appConfig.FASTIFY_PORT,
    host: listenAddress
  }

  try {
    await server.listen(fastifyConfig)
  } catch (error) {
    server.log.fatal(`${error}`)
  }

  return server
}

export { startFastify }
