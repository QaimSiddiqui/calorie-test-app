const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFoodEntry = {
  body: Joi.object().keys({
    productName: Joi.string().required(),
    price: Joi.number().required(),
    calories: Joi.number().required(),
    date: Joi.date().required(),
  }),
};

const getFoodEntries = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    startDate: Joi.date(),
    endDate: Joi.date().when('startDate', {
      is: Joi.exist(),
      then: Joi.date().required(),
      otherwise: Joi.optional(),
    }),
    isMonthView: Joi.boolean(),
    month: Joi.date().when('isMonthView', { is: Joi.exist(), then: Joi.date().required(), otherwise: Joi.optional() }),
  }),
};

const getFoodEntry = {
  params: Joi.object().keys({
    foodEntryId: Joi.string().custom(objectId),
  }),
};

const updateFoodEntry = {
  params: Joi.object().keys({
    foodEntryId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      productName: Joi.string(),
      price: Joi.number(),
      calories: Joi.number(),
      date: Joi.date(),
    })
    .min(1),
};

const deleteFoodEntry = {
  params: Joi.object().keys({
    foodEntryId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFoodEntry,
  getFoodEntries,
  getFoodEntry,
  updateFoodEntry,
  deleteFoodEntry,
};
