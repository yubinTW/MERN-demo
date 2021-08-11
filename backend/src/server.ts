import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import FastifyStatic from 'fastify-static'
import { Server, IncomingMessage, ServerResponse } from 'http'
import path from 'path'
import { establishConnection } from './plugins/mongodb'
import { TodoRouter } from './routes/todo'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
  logger: { prettyPrint: true }
})

const startFastify: (port: number) => FastifyInstance<Server, IncomingMessage, ServerResponse> = (port) => {
  server.register(require('fastify-cors'), {})

  server.listen(port, (err, _) => {
    if (err) {
      console.error(err)
    }
    establishConnection()
  })

  server.register(FastifyStatic, {
    root: path.join(__dirname, '../../frontend/build'),
    prefix: '/'
  })

  server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
    return reply.status(200).send({ msg: 'pong' })
  })

  server.register(TodoRouter, { prefix: '/api' })

  return server
}

export { startFastify }
