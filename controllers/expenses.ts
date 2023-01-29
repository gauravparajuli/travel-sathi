import { Request, Response, NextFunction, RequestHandler } from 'express'
import CRequest from '../types/CRequest'

import Expense from '../models/Expense'
import Category from '../models/Category'
import { CError } from '../types/CError'
import validateExpense from '../validators/expense-validator'

export const getAllExpenses: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const records = await Expense.find({ category: 'Expense' })
        res.status(200).json(records)
    } catch (error) {
        next(error)
    }
}

export const getExpense: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        const record = await Expense.findOne({ category: 'expense', _id: id })

        if (!record) {
            const error = new CError('expense not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}

export const newExpense: RequestHandler = async (
    req: CRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateExpense(req.body)
        if (error) {
            const err = new CError('input validation failed')
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        // check if supplied category actually exists
        const catInstance = await Category.findOne({
            category: 'expense',
            _id: req.body.categoryId,
        })
        if (!catInstance) {
            const err = new CError('no such category in expense')
            err.statusCode = 404
            err.details = error.details
            throw err
        }

        const expense = new Expense({ ...req.body, createdBy: req.user!._id })
        await expense.save()
        res.status(200).json(expense)
    } catch (error) {
        next(error)
    }
}

export const deleteExpense: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id
    try {
        await Expense.findByIdAndDelete(id)
        res.status(204).send()
    } catch (error) {
        next(error)
    }
}

export const updateExpense: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateExpense(req.body)
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
            const error = new CError('expense not found')
            error.statusCode = 404
            throw error
        }

        res.status(200).json(record)
    } catch (error) {
        next(error)
    }
}
