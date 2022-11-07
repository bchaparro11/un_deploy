import mongoose from "mongoose";


const travelSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    vehicle: {
        type: Object,
        unique: false,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    destiny: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    },
    remark: {
        type: String
    },
    passengers: {
        type: Array,
    },
    ratings: {
        type: Array,
    },
    status: {
        type: String
    }

})

export default mongoose.model('Travel', travelSchema)