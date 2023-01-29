import joi from 'joi'

const validator = (schema: any) => (payload: any) =>
    schema.validate(payload, { abortEarly: false })

const budgetSchema = joi.object({
    title: joi.string().min(4).required(),
    amount: joi.number().required(),
    categoryId: joi.string().required(),
})

export default validator(budgetSchema)
