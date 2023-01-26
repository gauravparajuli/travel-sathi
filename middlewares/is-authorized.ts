import { Response, NextFunction, RequestHandler } from 'express'
import CRequest from '../types/CRequest'

export const isManager: RequestHandler = (
    req: CRequest,
    res: Response,
    next: NextFunction
) => {
    if (req.user!.isManager) {
        next() // logged in as manager
    } else {
        res.status(401).json({
            message: 'you are not authorised to perform this action',
        })
    }
}

export const isStaff: RequestHandler = (
    req: CRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.user!.isManager) {
        next() // logged in as staff
    } else {
        res.status(401).json({
            message: 'you are not authorised to perform this action',
        })
    }
}
