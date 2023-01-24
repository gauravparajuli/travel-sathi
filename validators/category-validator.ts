import joi from 'joi'

const validator = (schema: any) => (payload: any) =>
    schema.validate(payload, { abortEarly: false })

const categorySchema = joi.object({
    title: joi.string().min(4).required(),
})

export default validator(categorySchema)
