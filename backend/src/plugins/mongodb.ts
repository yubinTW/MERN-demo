import mongoose from 'mongoose'

const host = process.env.MONGO_HOST || 'localhost'
const port = process.env.MONGO_PORT || 27017
const database = process.env.MONGO_DATABASE || 'fastify'

const establishConnection = () => {
  if (!process.env.JEST_WORKER_ID && mongoose.connection.readyState === 0) {
    mongoose.connect(`mongodb://${host}:${port}/${database}`, (err) => {
      if (!err) console.log('MongoDB connection successful.')
      else console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2))
    })
  }
}

export { establishConnection }
