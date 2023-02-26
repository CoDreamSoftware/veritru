import mongoose from 'mongoose'

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log('Already connected.')
        // Use current db connection
        return
    }

    // Use new db connection
    await mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
        if (err) throw err
        console.log('Connected to mongodb.')
    })
}

export default connectDB
