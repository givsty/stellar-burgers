import { getIngredientsApi, getUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TUser } from '@utils-types';

interface userState {
  isLoading: boolean;
  user: {};
  ingredients: TIngredient[];
}

const initialState: userState = {
  isLoading: false,
  user: {},
  ingredients: []
};

export const fetchUser = createAsyncThunk('users/fetchUser', async () =>
  getUserApi()
);

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

export const fun = () => {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action) {}
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });

    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<{ user: TUser }>) => {
        state.isLoading = false;
        state.user = action.payload;
      }
    );
  }
});

export default userSlice.reducer;
