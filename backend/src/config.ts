import { bool, cleanEnv, port, url } from 'envalid'
import * as dotenv from 'dotenv'

dotenv.config()

const env = cleanEnv(process.env, {
    FASTIFY_PORT: port({
        default: 8888
    }),
    FASTIFY_PRETTY_PRINT: bool({
        default: false
    }),
    MONGO_CONNECTION_STRING: url({
        default: 'mongodb://localhost:27017/myMERN'
    })
})

export { env }
