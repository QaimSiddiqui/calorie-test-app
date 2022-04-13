const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const foodEntrySchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
foodEntrySchema.plugin(toJSON);
foodEntrySchema.plugin(paginate);

/**
 * @typedef FoodEntry
 */
const FoodEntry = mongoose.model('FoodEntry', foodEntrySchema);

module.exports = FoodEntry;
