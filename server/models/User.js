import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  celPhone: {
    type: Number,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true    
  },
  password: {
    type: String,
    required: true,
    trim: false
  },
  vehicle: {
    type: Array,
  },
  favorite: {
    type: Array,
    required: false,
  },
  wheelHist: {
    type: Array,
    required: true,
  },
  photoUser: {
    url: String,
    publicId: String
  },
  userWheels: {
    type: Array,
    required: false,
  },
  verifyAccount: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  timestamps: true
}, {
  timestamps: true
})

export default mongoose.model('User', userSchema)