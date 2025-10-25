import { getFeedsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TOrder } from "@utils-types";

type FeedState = {
  feed: {
    total: number;
    totalToday: number;
    success: boolean;
    orders: TOrder[];
  };
}

const initialState: FeedState = {
  feed: {
    total: 0,
    totalToday: 0,
    success: false,
    orders: []
  }
}
//Получение всех заказов
export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () =>
  getFeedsApi()
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {

  },
  selectors: {
    selectFeedOrders: (state)=> state.feed.orders,
  },
  extraReducers: (builder) => {
    //Feeds
    builder.addCase(fetchFeeds.pending, (state, action) => {
    });

    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.feed = action.payload;
    });

    builder.addCase(fetchFeeds.rejected, (state, action) => {
    });
  }
})
export const {selectFeedOrders}= feedSlice.selectors
export default feedSlice.reducer