import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        isManager: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

export default model('User', UserSchema)
