import express, { Express } from 'express'

import categoriesRoutes from './routes/categories'

const app: Express = express()

// register middlewares here
app.use(express.json())

// register routes here
app.use('/cat', categoriesRoutes)

export default app
