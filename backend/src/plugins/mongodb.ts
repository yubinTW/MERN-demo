import mongoose from 'mongoose'

const establishConnection = async (connectionString: string) => {
  await mongoose.connect(connectionString)
}

export { establishConnection }
