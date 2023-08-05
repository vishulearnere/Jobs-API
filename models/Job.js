const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please Provide your company name'],
      maxLength: 50,
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Please Provide Positon'],
      maxLength: 100,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['interview', 'declined', 'pending'],
        mesaage: '{VALUE} is not supported', //change Value to VALUE
      },
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please Provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Job', JobSchema)
