import User from '@/database/models/User'
import dbConnect from '@/database/lib/dbConnect'
import handler from '@/database/middleware/handler'

handler
    .post(createUser)

async function createUser(req, res) {
    const { 
        username, 
        email, 
        password, 
        tenure, 
        organization, 
        role  
    } = req.body

    await dbConnect()

    const user = await User.create(req.body)

    res.status(201).json({ message: 'Created user!' })
}

export default handler
