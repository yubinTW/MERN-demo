import mongoose from 'mongoose'
import { env } from '../config'

const establishConnection = () => {
  const connectionString = env.MONGO_CONNECTION_STRING
  mongoose.connect(connectionString, (error) => {
    if (error) {
      console.log(`Error in DB connection: ${error}`)
    } else {
      console.log('MongoDB connection successful')
    }
  })
}

export { establishConnection }
