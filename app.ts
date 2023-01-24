import express, { Express } from 'express'

import categoriesRoutes from './routes/categories'
import errorHandler from './middlewares/error-handling'

const app: Express = express()

// register middlewares here
app.use(express.json())

// register routes here
app.use('/cat', categoriesRoutes)

app.use(errorHandler) // error handling middleware

export default app
