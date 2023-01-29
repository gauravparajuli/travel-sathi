import { Schema, model } from 'mongoose'

const ExpenseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export default model('Expense', ExpenseSchema)
