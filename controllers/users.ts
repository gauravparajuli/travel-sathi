import { Request, Response, NextFunction, RequestHandler } from 'express'
import bcrypt from 'bcryptjs'

import User from '../models/User'
import { CError } from '../types/CError'
import validateUser from '../validators/user-validator'

export const newUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { error } = validateUser(req.body)
        if (error) {
            const err = new CError('input validation failed')
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        const { email, password } = req.body

        // check if user is already registered
        const instance = await User.findOne({ email })
        if (instance) {
            const err = new CError('user already exists')
            err.statusCode = 400
            throw err
        }

        const hashedPassword = bcrypt.hashSync(password)

        const newUser = new User({ email, password: hashedPassword })
        await newUser.save()

        res.status(200).json({ _id: newUser._id, email: newUser.email })
    } catch (error) {
        next(error)
    }
}

export const loginUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // try {
    //     const records = await Category.find({ category: 'expense' })
    //     res.status(200).json(records)
    // } catch (error) {
    //     next(error)
    // }
}
