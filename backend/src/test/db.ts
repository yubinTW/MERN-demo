import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import * as F from 'fp-ts/function'
import * as TE from 'fp-ts/TaskEither'

const mongod = new MongoMemoryServer()

/**
 * Connect to mock memory db.
 */
export const connect = async (): Promise<void> => {
    await mongod.start()
    const uri = mongod.getUri()

    const mongooseOpts = {
        useNewUrlParser: true,
        autoReconnect: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 1000,
        poolSize: 10
    }

    await mongoose.connect(uri, mongooseOpts)
}

/**
 * Close db connection
 */
export const closeDatabase: () => Promise<void> = async () => {
    const dropDbTE = TE.tryCatch(
        () => mongoose.connection.dropDatabase(),
        (e) => new Error(`Drop DB error: ${e}`)
    )
    const connCloseTE = TE.tryCatch(
        () => mongoose.connection.close(),
        (e) => new Error(`Connection closing error: ${e}`)
    )
    const dbStopTE = TE.tryCatch(
        () => mongod.stop(),
        (e) => new Error(`DB stopping error: ${e}`)
    )
    const p = F.pipe(
        TE.bindTo('dropDb')(dropDbTE),
        TE.bind('connClose', () => connCloseTE),
        TE.bind('dbStop', () => dbStopTE),
        TE.map(({ dropDb, connClose, dbStop }) => dbStop)
    )

    await TE.match(
        (e) => console.log(`InMemMongo Error: ${e}`),
        (_) => ({})
    )(p)()

    //     await mongoose.connection.dropDatabase()
    //     await mongoose.connection.close()
    //     await mongod.stop()
}

/**
 * Delete db collections
 */
export const clearDatabase: () => Promise<void> = async () => {
    const collections = mongoose.connection.collections

    Object.keys(collections).forEach((k) => F.pipe(collections[k], async (collection) => await collection.deleteMany({})))

    // for (const key in collections) {
    //     const collection = collections[key]
    //     await collection.deleteMany({})
    // }
}
