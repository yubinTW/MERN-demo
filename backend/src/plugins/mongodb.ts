import mongoose from 'mongoose'

const establishConnection = () => {
  const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/myProject'
  if (!process.env.JEST_WORKER_ID && mongoose.connection.readyState === 0) {
    mongoose.connect(connectionString, (err) => {
      if (!err) console.log('MongoDB connection successful.')
      else console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2))
    })
  }
}

export { establishConnection }
