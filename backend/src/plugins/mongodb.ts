import mongoose from 'mongoose'

export const establishConnection = async (connectionString: string) => {
  await mongoose.connect(connectionString)
}
