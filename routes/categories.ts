import { Router } from 'express'

import isAuthenticated from '../middlewares/is-authenticated'
import { isManager, isStaff } from '../middlewares/is-authorized'

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
router.get('/budget/:id', isManager, getBudgetCategory)
router.post('/budget', isManager, newBudgetCategory)
router.patch('/budget/:id', isManager, updateCategory)
router.delete('/budget/:id', isManager, deleteCategory)

// expense category routes here
router.get('/expense', isAuthenticated, isStaff, getAllExpenseCategories)
router.get('/expense/:id', isAuthenticated, isStaff, getExpenseCategory)
router.post('/expense', isAuthenticated, isStaff, newExpenseCategory)
router.patch('/expense/:id', isAuthenticated, isStaff, updateCategory)
router.delete('/expense/:id', isAuthenticated, isStaff, deleteCategory)

export default router
