import { Request, Response, NextFunction, RequestHandler } from 'express'

import Category from '../models/Category'
import { CError } from '../types/CError'
import validateCategory from '../validators/category-validator'

export const getAllBudgetCategories: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const records = await Category.find({ category: 'budget' })
        res.status(200).json(records)
    } catch (error) {
        next(error)
    }
}

export const getBudgetCategory: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        const record = await Category.findOne({ category: 'budget', _id: id })

        if (!record) {
            const error = new CError('category not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}

export const newBudgetCategory: RequestHandler = async (
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

export const getAllExpenseCategories: RequestHandler = async (
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

export const getExpenseCategory: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        const record = await Category.findOne({ category: 'expense', _id: id })

        if (!record) {
            const error = new CError('category not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}

export const newExpenseCategory: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const expense = new Category({ ...req.body, category: 'expense' })
        await expense.save()
        res.status(200).json(expense)
    } catch (error) {
        next(error)
    }
}

export const deleteCategory: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        await Category.findByIdAndDelete(id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const updateCategory: RequestHandler = async (
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

        const id = req.params.id

        const record = await Category.findByIdAndUpdate(
            id,
            { ...req.body },
            {
                upsert: false,
                new: true,
            }
        )

        if (!record) {
            const error = new CError('category not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}
