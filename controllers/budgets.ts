import { Request, Response, NextFunction, RequestHandler } from 'express'
import CRequest from '../types/CRequest'

import Budget from '../models/Budget'
import Category from '../models/Category'
import { CError } from '../types/CError'
import validateBudget from '../validators/budget-validator'

export const getAllBudgets: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const records = await Budget.find()
        res.status(200).json(records)
    } catch (error) {
        next(error)
    }
}

export const getBudget: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        const record = await Budget.findOne({ _id: id })

        if (!record) {
            const error = new CError('budget not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}

export const newBudget: RequestHandler = async (
    req: CRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateBudget(req.body)
        if (error) {
            const err = new CError('input validation failed')
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        // check if supplied category actually exists
        const catInstance = await Category.findOne({
            category: 'budget',
            _id: req.body.categoryId,
        })
        if (!catInstance) {
            const err = new CError('no such category in budget')
            err.statusCode = 404
            err.details = error.details
            throw err
        }

        const budget = new Category({ ...req.body, createdBy: req.user!._id })
        await budget.save()
        res.status(200).json(budget)
    } catch (error) {
        next(error)
    }
}

export const deleteBudget: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        await Budget.findByIdAndDelete(id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const updateBudget: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateBudget(req.body)
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
            const error = new CError('budget not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}
