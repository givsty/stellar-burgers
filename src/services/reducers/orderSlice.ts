import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type OrderState = {
  orderData: TOrder | null;
  orderRequest: boolean;
};

const initialState: OrderState = {
  orderData: null,
  orderRequest: false
};

//Отправка заказа
export const fetchPostOrder = createAsyncThunk(
  'fetchPostOrder/order',
  async (data: string[]) => {
    try {
      const response = await orderBurgerApi(data);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const orderSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    clearModalData(state) {
      state.orderData = null;
      state.orderRequest = false;
    }
  },
  extraReducers: (builder) => {
    //order
    builder.addCase(fetchPostOrder.pending, (state, action) => {
      state.orderRequest = true;
    });

    builder.addCase(fetchPostOrder.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.orderRequest = false;
      state.orderData = action.payload.order;
    });
    builder.addCase(fetchPostOrder.rejected, (state, action) => {
      state.orderRequest = false;
    });
  }
});

export const { clearModalData } = orderSlice.actions;

export default orderSlice.reducer;
