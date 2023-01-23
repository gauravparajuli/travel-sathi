import { Router } from 'express'

import {
    getAllBudgetCategories,
    getBudgetCategory,
    newBudgetCategory,
    updateBudgetCategory,
    deleteBudgetCategory,
    getAllExpenseCategories,
    getExpenseCategory,
    newExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
} from '../controllers/categories'

const router = Router()

// budget category routes here
router.get('/budget', getAllBudgetCategories)
router.get('/budget/:id', getBudgetCategory)
router.post('/budget', newBudgetCategory)
router.patch('/budget/:id', updateBudgetCategory)
router.delete('/budget/:id', deleteBudgetCategory)

// expense category routes here
router.get('/expense', getAllExpenseCategories)
router.get('/expense/:id', getExpenseCategory)
router.post('/expense', newExpenseCategory)
router.patch('/expense/:id', updateExpenseCategory)
router.delete('/expense/:id', deleteExpenseCategory)

export default router
