import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import contsructorReducer from './slices/contsructorReducer';

export const rootReducer = combineReducers({
  constructor: contsructorReducer
  // ingredients: ingredientsReducer,
  // feeds: feedsReducer,
  // userOrder: userOrderReducer,
  // userData: userDataReducer
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
