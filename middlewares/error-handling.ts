import { Request, Response, NextFunction, RequestHandler } from 'express'
import { CError } from '../types/CError'

const errorHandler = (
    error: CError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error.statusCode) {
        res.status(error.statusCode).json(error)
    } else {
        res.status(500).json(error)
    }
    next()
}

export default errorHandler
