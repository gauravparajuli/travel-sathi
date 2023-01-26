import { Router } from 'express'

import { loginUser, newUser } from '../controllers/users'

const router = Router()

// budget category routes here
router.post('/login', loginUser)
router.post('/signup', newUser)

export default router
