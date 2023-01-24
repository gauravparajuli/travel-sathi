import { Schema, model } from 'mongoose'

const CategorySchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
            enum: ['budget', 'expense'],
        },
    },
    {
        timestamps: true,
    }
)

export default model('Category', CategorySchema)
