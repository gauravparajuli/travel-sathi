import { Router } from 'express'

import {
    getAllBudgetCategories,
    getBudgetCategory,
    newBudgetCategory,
    updateBudgetCategory,
    deleteBudgetCategory,
} from '../controllers/categories'

const router = Router()

router.get('/budget', getAllBudgetCategories)
router.get('/budget/:id', getBudgetCategory)

export default router
