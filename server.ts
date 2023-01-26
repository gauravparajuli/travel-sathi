import dotenv from 'dotenv'
import Mongoose from 'mongoose'

import app from './app'

dotenv.config()

const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV != 'production') {
    Mongoose.connect('mongodb://localhost:27017/travelsathi').then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`)
        })
    })
}
