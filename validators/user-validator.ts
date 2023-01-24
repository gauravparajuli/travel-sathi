import joi from 'joi'

const validator = (schema: any) => (payload: any) =>
    schema.validate(payload, { abortEarly: false })

const userSchema = joi.object({
    email: joi
        .string()
        .email({ tlds: { allow: ['com', 'net'] } })
        .required(),
    password: joi.string().min(8).required(),
})

export default validator(userSchema)
