/* eslint-disable import/no-anonymous-default-export */
import Joi from 'joi'
import dbConnect from '@/lib/dbConnect'
import Article from '@/models/Article'

const schema = Joi.object({
    ipfs_cid: Joi.string().required(),
    headline: Joi.string().required(),
    category: Joi.string().required(),
    short_desc: Joi.string().required(),
    result: Joi.string()
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
        result
    })

    if (error) {
        return res
            .status(401)
            .json({
                success: false,
                message: error.details[0].message.replace(/['"]+/g, ''),
            })
    }

    try {
        const ifExist = await Article.findOne({ ipfs_cid })
        if (ifExist) {
            return res
                .status(401)
                .json({ success: false, message: 'Article Already Exists' })
        } else {

            const createArticle = await Article.create({
                ipfs_cid,
                headline,
                category,
                short_desc,
                result
            })

            return res
                .status(201)
                .json({
                    success: true,
                    message: 'Article added successfully',
                })
        }
    } catch (error) {
        console.log('Error in register (server) => ', error)
        return res
            .status(500)
            .json({
                success: false,
                message: 'Something Went Wrong Please Retry Later !',
            })
    }
}
