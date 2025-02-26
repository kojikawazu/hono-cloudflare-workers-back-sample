import { Hono } from 'hono'
import { userHandler } from '../handlers/users/userHandler'

const router = new Hono()

router.route('/users', userHandler)

export default router