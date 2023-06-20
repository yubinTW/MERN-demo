import FastifyCors from '@fastify/cors'
import FastifyStatic from '@fastify/static'
import fastify, { FastifyInstance } from 'fastify'
import path from 'path'

import { establishConnection } from './plugins/mongodb'
import { TodoRouter } from './routes/todo'
import { AppConfig } from './types/appConfig'

export const serverOf: () => FastifyInstance = () => {
  const server: FastifyInstance = fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      },
      level: 'debug'
    }
  })
  server.register(FastifyCors, {})

  server.register(FastifyStatic, {
    root: path.join(__dirname, '../../frontend/dist'),
    prefix: '/'
  })

  server.get('/ping', async (request, reply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  server.register(TodoRouter, { prefix: '/api' })

  return server
}

export const serverStart: (server: FastifyInstance) => (appConfig: AppConfig) => Promise<FastifyInstance> =
  (server) => async (appConfig) => {
    if (appConfig.MONGO_CONNECTION_STRING) {
      try {
        await establishConnection(appConfig.MONGO_CONNECTION_STRING)
        server.log.info(`Mongo connect successfully`)
      } catch (error) {
        server.log.fatal(`Failed to connect mongodb: ${error}`)
        throw new Error(`${error}`)
      }
    }

    await server.listen({
      port: appConfig.FASTIFY_PORT,
      host: appConfig.FASTIFY_HOST
    })

    return server
  }
