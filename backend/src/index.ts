import { startFastify } from './server'
import dotEnv from 'dotenv'

dotEnv.config()
const port = process.env.FASTIFY_PORT || 8888

// Start your server
const server = startFastify(Number(port))

export { server }
