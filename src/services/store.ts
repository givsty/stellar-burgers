import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import userReducer from './reducers/userSlice';
import userSlice from './reducers/userSlice';
import feedSlice from './reducers/feedSlice';
import orderSlice from './reducers/orderSlice';
import constructorSlice from './reducers/constructorSlice';
// Заменить на импорт настоящего редьюсера
const rootReducer = combineReducers({
  user: userSlice,
  feed: feedSlice,
  order: orderSlice,
  constructor: constructorSlice
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
