const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  leadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  amount: {
    type: Number,
    required: [true, 'Please add a sale amount']
  },
  status: {
    type: String,
    enum: ['Pending', 'Closed', 'Cancelled'],
    default: 'Pending'
  },
  closedDate: {
    type: Date
  },
  product: {
    type: String,
    required: [true, 'Please specify the product/service sold']
  },
  salesPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', SaleSchema); 