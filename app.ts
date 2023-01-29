import express, { Express } from 'express'

import categoriesRoutes from './routes/categories'
import userRoutes from './routes/users'
import budgetRoutes from './routes/budgets'
import expenseRoutes from './routes/expenses'

import errorHandler from './middlewares/error-handling'

const app: Express = express()

// register middlewares here
app.use(express.json())

// register routes here
app.use('/cat', categoriesRoutes)
app.use('/user', userRoutes)
app.use('/entry', budgetRoutes)
app.use('/entry', expenseRoutes)

app.use(errorHandler) // error handling middleware

export default app
