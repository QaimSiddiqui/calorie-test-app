const httpStatus = require('http-status');
const moment = require('moment');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { foodEntryService } = require('../services');
const { FoodEntry } = require('../models');

const createFoodEntry = catchAsync(async (req, res) => {
  const foodEntry = await foodEntryService.createFoodEntry({ ...req.body, createdBy: req.user._id });
  res.status(httpStatus.CREATED).send(foodEntry);
});

const getFoodEntries = catchAsync(async (req, res) => {
  const filter = {};
  const search = pick(req.query, ['startDate', 'endDate', 'isMonthView', 'month']);
  if (search.isMonthView && search.month) {
    const aggregateMatchCondition = [{ $expr: { $eq: [{ $month: '$date' }, { $month: search.month }] } }];
    if (req.user.role !== 'admin') {
      aggregateMatchCondition.push({
        createdBy: req.user._id,
      });
    }
    const grouped = await FoodEntry.aggregate([
      {
        $match: {
          $and: aggregateMatchCondition,
        },
      },
      { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'user' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
          totalAmount: { $sum: '$price' },
          totalCalories: { $sum: '$calories' },
          results: { $push: '$$ROOT' },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]).exec();
    return res.send({ monthData: grouped });
  }
  if (search.startDate && search.endDate) {
    filter.date = { $gte: moment(search.startDate).startOf('day'), $lte: moment(search.endDate).endOf('day') };
  }
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await foodEntryService.queryFoodEntries(filter, options, req.user);
  res.send(result);
});

const getFoodEntry = catchAsync(async (req, res) => {
  const foodEntry = await foodEntryService.getFoodEntryById(req.params.foodEntryId);
  if (!foodEntry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Food Entry not found');
  }
  res.send(foodEntry);
});

const updateFoodEntry = catchAsync(async (req, res) => {
  const foodEntry = await foodEntryService.updateFoodEntryById(req.params.foodEntryId, req.body, req.user);
  res.send(foodEntry);
});

const deleteFoodEntry = catchAsync(async (req, res) => {
  await foodEntryService.deleteFoodEntryById(req.params.foodEntryId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFoodEntry,
  getFoodEntries,
  getFoodEntry,
  updateFoodEntry,
  deleteFoodEntry,
};
