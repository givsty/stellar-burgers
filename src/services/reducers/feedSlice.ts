import { getFeedsApi, getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type feedSlice = {
  isLoadingFeeds: boolean;
  feed: {
    total: number;
    totalToday: number;
    success: boolean;
    orders: TOrder[];
  };
};

const initialState: feedSlice = {
  feed: {
    total: 0,
    totalToday: 0,
    success: false,
    orders: []
  },
  isLoadingFeeds: false
};

//Получение всех заказов
export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () =>
  getFeedsApi()
);
const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Feeds
    builder.addCase(fetchFeeds.pending, (state, action) => {
      state.isLoadingFeeds = true;
    });

    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.feed = action.payload;
    });

    builder.addCase(fetchFeeds.rejected, (state, action) => {
      state.isLoadingFeeds = false;
    });
  }
});

export const {} = feedSlice.actions;

export default feedSlice.reducer;
