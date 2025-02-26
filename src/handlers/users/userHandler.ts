import { Hono } from 'hono'

export const userHandler = new Hono()

userHandler.get('/', (c) => {
  return c.text('Hello Hono!')
})