/* eslint-disable import/no-anonymous-default-export */
import { hash } from 'bcryptjs'
import Joi from 'joi'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    tenure: Joi.string().required(),
    organization: Joi.string().required(),
    role: Joi.string().required(),
})

export default async (req, res) => {
    await dbConnect()

    const { 
        name,
        email,
        password,
        tenure,
        organization,
        role
    } = req.body
    
    const { error } = schema.validate({ 
        name,
        email,
        password,
        tenure,
        organization,
        role
    })

    if (error) {
        return res.status(401).json({
            success: false,
            message: error.details[0].message.replace(/['"]+/g, ''),
        })
    }

    try {
        const ifExist = await User.findOne({ email })
        if (ifExist) {
            return res.status(401).json({ 
                success: false,
                message: 'User Already Exist'
            })
        } else {
            const hashedPassword = await hash(password, 12)
            const createUser = await User.create({
                name,
                email,
                password: hashedPassword,
                tenure,
                organization,
                role,
                isApproved: false,
            })
            
            return res.status(201).json({
                success: true,
                message: 'Account created successfully',
            })
        }
    } catch (error) {
        console.log('Error in register (server) => ', error)
        return res.status(500).json({
            success: false,
            message: 'Something Went Wrong Please Retry Later !',
        })
    }
}