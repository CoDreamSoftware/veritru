import mongoose from 'mongoose'

async function dbConnect() {
    const connectionUrl = process.env.MONGODB_URI

    mongoose
        .connect(connectionUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Database connected!'))
        .catch((err) =>
            console.log('Error connecting to db...' + err.message)
        )

    mongoose.set('strictQuery', false)
}

export default dbConnect
