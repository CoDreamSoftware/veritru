import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    tenure: {
        type: String,
        default: '0-5 years',
    },
    organization: {
        type: String,
        default: 'Freelancer',
    },
    role: {
        type: String,
        default: 'Independent',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User