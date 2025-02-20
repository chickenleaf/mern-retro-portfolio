const mongoose = require('mongoose')


const subscribersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
      },
      subscriptionDate: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['active', 'unsubscribed'],
        default: 'active'
      },
      preferences: {
        receiveUpdates: {
          type: Boolean,
          default: true
        }
      }
})

module.exports = mongoose.model('Subscriber', subscribersSchema)