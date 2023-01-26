import express, { Express } from 'express'

import categoriesRoutes from './routes/categories'
import userRoutes from './routes/users'
import errorHandler from './middlewares/error-handling'

const app: Express = express()

// register middlewares here
app.use(express.json())

// register routes here
app.use('/cat', categoriesRoutes)
app.use('/user', userRoutes)

app.use(errorHandler) // error handling middleware

export default app
