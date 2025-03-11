const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    eRecharge: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    oldDue: {
        type: Number,
        required: true
    },
    digitalAmount: {
        type: Number,
        required: true
    },
    denominations: {
        type: [
            {
                currencyType: {
                    type: Number,
                    enum: [500, 200, 100, 50, 20, 10], // Restricts to predefined values
                    required: true
                },
                count: {
                    type: Number,
                    required: true,
                    default: 0
                },
                total: {
                    type: Number,
                    required: true,
                    default: 0
                }
            }
        ],
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    finalAmount: {
        type: Number,
        required: true
    },
    due: {
        type: Number,
        required: true
    }
});

const SalesModel = mongoose.model('Sales', salesSchema);

module.exports = SalesModel;
