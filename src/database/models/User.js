import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

mongoose.set('strictQuery', false)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true, 
        unique: [true, "Account already exists."],
        validate: [validator.isEmail, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minLength: [6, "Password must be at least 6 characters."],
        select: false, //dont send back password after request
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
    accessLevel: {
        type: String,
        default: 'user',
        enum: {
            values: [
                'user',
                'admin'
            ]
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// ENCRYPTION
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

export default mongoose.models.User || mongoose.model('User', userSchema)