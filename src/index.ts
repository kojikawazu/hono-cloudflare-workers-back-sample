import { Hono } from 'hono'
import router from './routers/routers'

const app = new Hono()

app.route('/api', router)

export default {
  fetch: app.fetch,
}