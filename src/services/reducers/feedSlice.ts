import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type feedSlice = {
};

const initialState: feedSlice = {

};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const feedSlice = createSlice({
  name: 'feedSlice',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {

  }
});

export const {
} = feedSlice.actions;

export default feedSlice.reducer;
