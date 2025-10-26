import { getOrdersApi } from "@api"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TOrder } from "@utils-types"

interface OrderState {
  orders: TOrder | null
  isLoading: boolean
  ordersUser: TOrder[]
}

const initialState: OrderState = {
  orders: null,
  isLoading: false,
  ordersUser: []
}
//Получение заказов пользователя
export const fetchUserOrders = createAsyncThunk('fetchUserOrders', async () =>
  getOrdersApi()
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {

  },
  // selectors: {
  //   selectUserOrders: (state)=> state.ordersUser 
  // },
  extraReducers(builder) {
    builder.addCase(fetchUserOrders.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      action.payload ? (state.ordersUser = action.payload) : '';
    });

    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
})

export default orderSlice.reducer