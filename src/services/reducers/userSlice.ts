import { getIngredientsApi, getUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TUser } from '@utils-types';

interface userState {
  isLoading: boolean;
  user: {};
  ingredients: TIngredient[];
  isAuthCheked: boolean;
  isAuthenticated: boolean;
  data: {};
  loginUserError: null;
  loginUserRequest: boolean;
  constructorItems: TConstructorIngredient[];
}

const initialState: userState = {
  isLoading: false,
  user: {},
  ingredients: [],
  isAuthCheked: false,
  isAuthenticated: false,
  data: {},
  loginUserError: null,
  loginUserRequest: false,
  constructorItems: []
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
    addIngredient(state, action) {
      state.constructorItems.push(action.payload);
    }
  },

  extraReducers: (builder) => {
    //Ingredients
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

    //user
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<{ user: TUser }>) => {
        state.isLoading = true;
        state.user = action.payload;
      }
    );

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthCheked = false;
    });
  }
});

export const { addIngredient } = userSlice.actions;
export default userSlice.reducer;
