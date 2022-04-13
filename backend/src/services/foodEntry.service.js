const httpStatus = require('http-status');
const { FoodEntry } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a foodEntry
 * @param {Object} foodEntryBody
 * @returns {Promise<FoodEntry>}
 */
const createFoodEntry = async (foodEntryBody) => {
  return FoodEntry.create(foodEntryBody);
};

/**
 * Query for foodEntries
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFoodEntries = async (filter, options, user) => {
  if (user && user.role !== 'admin') {
    filter.createdBy = user._id;
  } else {
    options['populate'] = 'createdBy';
  }
  const foodEntries = await FoodEntry.paginate(filter, options);
  return foodEntries;
};

const getFoodEntries = async (filter = {}) => {
  return FoodEntry.find(filter);
};

/**
 * Get foodEntry by id
 * @param {ObjectId} id
 * @returns {Promise<FoodEntry>}
 */
const getFoodEntryById = (id) => {
  return FoodEntry.findById(id);
};

/**
 * Get foodEntry by email
 * @param {string} email
 * @returns {Promise<FoodEntry>}
 */
const getFoodEntryByEmail = (email) => {
  return FoodEntry.findOne({ email });
};

/**
 * Update foodEntry by id
 * @param {ObjectId} foodEntryId
 * @param {Object} updateBody
 * @returns {Promise<FoodEntry>}
 */
const updateFoodEntryById = async (foodEntryId, updateBody, user) => {
  const foodEntry = await getFoodEntryById(foodEntryId);
  if (!foodEntry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Food Entry not found');
  }

  if (user && user._id.toString() !== foodEntry.createdBy.toString() && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to update');
  }
  Object.assign(foodEntry, updateBody);
  await foodEntry.save();
  return foodEntry;
};

/**
 * Delete foodEntry by id
 * @param {ObjectId} foodEntryId
 * @returns {Promise<FoodEntry>}
 */
const deleteFoodEntryById = async (foodEntryId, user) => {
  const foodEntry = await getFoodEntryById(foodEntryId);
  if (!foodEntry) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Food Entry not found');
  }
  if (user && user._id?.toString() !== foodEntry?.createdBy?.toString() && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not allowed to delete');
  }
  await foodEntry.remove();
  return foodEntry;
};

module.exports = {
  createFoodEntry,
  queryFoodEntries,
  getFoodEntryById,
  getFoodEntryByEmail,
  updateFoodEntryById,
  deleteFoodEntryById,
  getFoodEntries,
};
