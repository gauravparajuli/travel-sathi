import { Schema, model } from 'mongoose'

const BudgetSchema = new Schema(
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
        createdBy: {
            required: true,
            type: Schema.Types.ObjectId,
        },
    },
    {
        timestamps: true,
    }
)

export default model('Budget', BudgetSchema)
