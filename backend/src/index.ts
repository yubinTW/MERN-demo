import { startFastify } from './server'
import { env } from './config'

const port = env.FASTIFY_PORT

const server = startFastify(port)

export { server }
