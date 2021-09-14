import mongoose from "mongoose"
import dotenv from "dotenv";

dotenv.config();

console.log("test",process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useFindAndModify: false,
}).then(console.log("mongo connected"))

const sessionSchema = new mongoose.Schema ({
    id: String,
    content: {},
    shop: String
})

const MongoSession = new mongoose.model("User", sessionSchema)

module.exports = MongoSession