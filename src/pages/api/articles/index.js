/* eslint-disable import/no-anonymous-default-export */
import Joi from 'joi'
import Article from '@/models/Article'
import dbConnect from '@/lib/dbConnect'

const schema = Joi.object({
    ipfs_cid: Joi.string().required(),
    headline: Joi.string().required(),
    category: Joi.string().required(),
    short_desc: Joi.string().required(),
    result: Joi.string(),
})

export default async (req, res) => {
    await dbConnect()

    const { 
        ipfs_cid,
        headline,
        category,
        short_desc,
        result 
    } = req.body

    const { error } = schema.validate({
        ipfs_cid,
        headline,
        category,
        short_desc,
        result,
    })

    if (error) {
        return res.status(401).json({
            success: false,
            message: error.details[0].message.replace(/['"]+/g, ''),
        })
    }

    switch (req.method) {
        case 'GET':
            try {
                const article = await Article.find()
                if (!article) return res.status(400).json({ success: false, message: "Article does not exists" })
                return res.status(200).json({ success: true, data: article })
            } catch (error) {
                return res.status(400).json({ success: false, message: error.message })
            }

        case 'POST':
            try {
                const ifExist = await Article.findOne({ ipfs_cid })
                if (ifExist) {
                    return res.status(401).json({ 
                        success: false, 
                        message: 'Article Already Exists'
                    })
                } else {
                    await Article.create({
                        ipfs_cid,
                        headline,
                        category,
                        short_desc,
                        result,
                    })
                    return res.status(201).json({
                        success: true,
                        message: 'Article added successfully',
                    })
                }
            } catch (error) {
                console.log('Error in creating article (server) => ', error)
                return res.status(500).json({
                    success: false,
                    message: 'Something Went Wrong Please Retry Later !',
                })
            }

        default:
            return res.status(400).json({ msg: 'This method is not supported' })
    }
}
