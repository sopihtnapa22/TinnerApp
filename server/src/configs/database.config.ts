import { connect } from "bun"
import mongoose from "mongoose"

const username = Bun.env.MONGGO_DB_USERNAME || 'sophitnapha'
const password = 'WQSbQh8gGsjiU0uY'
const db_name = Bun.env.MONGO_DBNAME || 'tinner_app'

const uri = `mongodb+srv://${username}:${password}@cluster0.bqtia.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect: async function () {
        try {
            await mongoose.connect(uri)
            console.log('----MongoDB Conneted----')
        } catch (error) {
            console.error('----MongoDB connection error ----')
            console.error(error)
        }


    }
}