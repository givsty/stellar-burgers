import { TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import constructorSlice from "./slices/constructorSlice";

const rootReducer = combineReducers({
    constructor: constructorSlice,
    // feed: feedSlice,
    // order: orderSlice,
    // user: userSlice,
});

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;