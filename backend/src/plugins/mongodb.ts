import mongoose from 'mongoose'

const establishConnection = () => {
  const connectionString = process.env.MONGO_CONNECTION_STRING || 'mongodb://localhost:27017/myProject'
  mongoose.connect(connectionString, (error) => {
    if (error) {
      console.log(`Error in DB connection: ${error}`)
    } else {
      console.log('MongoDB connection successful')
    }
  })
}

export { establishConnection }
