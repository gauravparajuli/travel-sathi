import { Request, Response, NextFunction, RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

        const hashedPassword = bcrypt.hashSync(password, 7)

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
    try {
        const { error } = validateUser(req.body)
        if (error) {
            const err = new CError('input validation failed')
            err.statusCode = 422
            err.details = error.details
            throw err
        }

        const { email, password } = req.body

        // verify email and password

        const userInstance = await User.findOne({ email })
        if (!userInstance) {
            const error = new CError('invalid user or password.')
            error.statusCode = 401
            throw error
        }

        // valid user now check for password
        const isPasswordMatching = await bcrypt.compare(
            password,
            userInstance.password
        )
        if (!isPasswordMatching) {
            const error = new CError('invalid user or password.')
            error.statusCode = 401
            throw error
        }

        const accessToken = jwt.sign(
            {
                id: userInstance._id,
                isManager: userInstance.isManager,
            },
            process.env.JWT_SECRET_KEY || 'jwtsecretkey',
            { expiresIn: process.env.JWT_TOKEN_LIFE || '3d' }
        )

        res.status(200).json({
            _id: userInstance._id,
            email: userInstance.email,
            accessToken,
        })
    } catch (error) {
        next(error)
    }
}
