import { Request, Response, NextFunction, RequestHandler } from 'express'

import Category from '../models/Category'
import { CError } from '../types/CError'
import validateCategory from '../validators/category-validator'

export const newUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateCategory(req.body)
        if (error) {
            const err = new CError('input validation failed')
            err.statusCode = 422
            err.details = error.details
            throw err
        }
        const budget = new Category({ ...req.body, category: 'budget' })
        await budget.save()
        res.status(200).json(budget)
    } catch (error) {
        next(error)
    }
}

export const loginUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const records = await Category.find({ category: 'expense' })
        res.status(200).json(records)
    } catch (error) {
        next(error)
    }
}
