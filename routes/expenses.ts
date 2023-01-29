import { Router } from 'express'

import isAuthenticated from '../middlewares/is-authenticated'
import { isStaff } from '../middlewares/is-authorized'

import {
    getAllExpenses,
    getExpense,
    newExpense,
    updateExpense,
    deleteExpense,
} from '../controllers/expenses'

const router = Router()

router.get('/expense', isAuthenticated, isStaff, getAllExpenses)
router.get('/expense/:id', isAuthenticated, isStaff, getExpense)
router.post('/expense', isAuthenticated, isStaff, newExpense)
router.patch('/expense/:id', isAuthenticated, isStaff, updateExpense)
router.delete('/expense/:id', isAuthenticated, isStaff, deleteExpense)

export default router
