import { Request } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export interface CJwtPayload extends JwtPayload {
    _id: string
    isManager: boolean
}

interface CRequest extends Request {
    user?: CJwtPayload
}

export default CRequest
