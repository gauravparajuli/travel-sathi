import jwt from 'jsonwebtoken'
import { Response, NextFunction, RequestHandler } from 'express'
import CRequest, { CJwtPayload } from '../types/CRequest'

const isAuthenticated: RequestHandler = (
    req: CRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.get('Authorization')
    if (authHeader) {
        const token = authHeader.split(' ')[1]
        jwt.verify(
            token,
            process.env.JWT_SECRET_KEY || 'jwtsecretkey',
            (err, user) => {
                if (err) {
                    res.status(401).json({
                        message: 'invalid token.',
                    })
                } else {
                    req.user = user as CJwtPayload
                    next()
                }
            }
        )
    } else {
        res.status(401).json({
            message: 'you are not authenticated.',
        })
    }
}

export default isAuthenticated
