import { Router } from 'express'

import isAuthenticated from '../middlewares/is-authenticated'
import { isManager } from '../middlewares/is-authorized'

import {
    getAllBudgets,
    getBudget,
    newBudget,
    updateBudget,
    deleteBudget,
} from '../controllers/budgets'

const router = Router()

router.get('/budget', isAuthenticated, isManager, getAllBudgets)
router.get('/budget/:id', isAuthenticated, isManager, getBudget)
router.post('/budget', isAuthenticated, isManager, newBudget)
router.patch('/budget/:id', isAuthenticated, isManager, updateBudget)
router.delete('/budget/:id', isAuthenticated, isManager, deleteBudget)

export default router
