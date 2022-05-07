import fastify, { FastifyInstance } from 'fastify'
import FastifyStatic from '@fastify/static'
import FastifyCors from '@fastify/cors'
import path from 'path'
import { establishConnection } from './plugins/mongodb'
import { TodoRouter } from './routes/todo'

const server: FastifyInstance = fastify({
  logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance = (port) => {
  server.register(FastifyCors, {})

  server.listen(port, (error, _) => {
    if (error) {
      server.log.fatal(`${error}`)
    }
    establishConnection()
  })

  server.register(FastifyStatic, {
    root: path.join(__dirname, '../../frontend/build'),
    prefix: '/'
  })

  server.get('/ping', async (request, reply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  server.register(TodoRouter, { prefix: '/api' })

  return server
}

export { startFastify }
