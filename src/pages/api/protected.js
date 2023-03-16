import { hasTokenMiddleware } from '@/database/middleware/checkUser'
import handler from '@/database/middleware/handler'

handler.use(hasTokenMiddleware).get(protectedAPI)

async function protectedAPI(req, res, next) {
    res.status(200).send('Success!')
}

export default handler
