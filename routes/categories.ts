import { Router } from 'express'

import isAuthenticated from '../middlewares/is-authenticated'
import { isManager } from '../middlewares/is-authorized'

import {
    getAllBudgetCategories,
    getBudgetCategory,
    newBudgetCategory,
    getAllExpenseCategories,
    getExpenseCategory,
    newExpenseCategory,
    updateCategory,
    deleteCategory,
} from '../controllers/categories'

const router = Router()

// budget category routes here
router.get('/budget', isAuthenticated, isManager, getAllBudgetCategories)
router.get('/budget/:id', getBudgetCategory)
router.post('/budget', newBudgetCategory)
router.patch('/budget/:id', updateCategory)
router.delete('/budget/:id', deleteCategory)

// expense category routes here
router.get('/expense', getAllExpenseCategories)
router.get('/expense/:id', getExpenseCategory)
router.post('/expense', newExpenseCategory)
router.patch('/expense/:id', updateCategory)
router.delete('/expense/:id', deleteCategory)

export default router
