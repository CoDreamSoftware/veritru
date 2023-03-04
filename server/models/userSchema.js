import mongoose from 'mongoose'

const userSchema = mongoose.Schema({

	nonce: String,
	address: {
        type: String,
        unique: true
    }

}, { timestamps: { createdAt: 'created_at' } })

let User = mongoose.models.users || mongoose.model('User', userSchema)

export default User