import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
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
    isAdmin:{
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User
