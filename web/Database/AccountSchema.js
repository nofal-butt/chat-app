import mongoose from "mongoose"

const Account = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    notice: {
        type: String,
        require: false
    },
    url: {
        type: String,
        require: true
    },
    toggle: {
        type: Boolean,
        require: true
    },
    shop: {
        type: String,
        require: true
    },
    selected:{
        type:Boolean,
        require:false,
        default: false,
    }
})

const AccountModel = mongoose.model("user", Account)
export default AccountModel