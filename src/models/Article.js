import mongoose from 'mongoose'

const articleSchema = new mongoose.Schema({
    ipfs_cid: {
        type: String,
        required: true, 
        unique: true
    },
    headline: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        default: 'News',
    },
    short_desc: {
        type: String,
        required: true,
    },
    result: {
        type: String,
        default: 'Undetermined',
    },
},{timestamps: true})

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema)

export default Article