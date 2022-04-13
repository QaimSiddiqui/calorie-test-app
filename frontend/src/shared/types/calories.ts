import { UserType } from './auth';

export interface FoodEntryType {
  productName: string;
  price: number;
  calories: number;
  date: string;
  createdBy?: UserType;
  _id: string;
}
export interface FoodEntriesListResponseType {
  limit: number;
  page: number;
  results: Array<FoodEntryType>;
  totalPages: number;
  totalResults: number;
  monthData: MonthFoodEntryTypes[];
}
export interface MonthFoodEntryTypes {
  _id: string;
  totalAmount: number;
  totalCalories: number;
  results: Array<FoodEntryType>;
}
export interface FoodEntriesMonthListResponseType {}

export interface UpsertFoodEntryType {
  productName: string;
  price: number;
  calories: number;
  date: Date;
}
