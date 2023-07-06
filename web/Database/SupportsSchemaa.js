import mongoose from "mongoose"
const Support = mongoose.Schema({
    StoreURL: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    password: {
        type: Number,
        require: false
    }


})

const SupportModel = mongoose.model("Help", Support)
export default SupportModel