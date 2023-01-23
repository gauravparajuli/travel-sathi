import { Request, Response, NextFunction, RequestHandler } from 'express'

export const getAllBudgetCategories: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(200).send('it is working')
}

export const getBudgetCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const newBudgetCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const updateBudgetCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const deleteBudgetCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const getAllExpenseCategories: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const getExpenseCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const newExpenseCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const updateExpenseCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}

export const deleteExpenseCategory: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {}
