import { getFeedsApi, getIngredientsApi, getUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';

interface userState {
  isLoading: boolean;
  user: {};
  ingredients: TIngredient[];
  isAuthCheked: boolean;
  isAuthenticated: boolean;
  data: {};
  loginUserError: null;
  loginUserRequest: boolean;
  orders: TOrder[];
  constructorItems: {
    bun: {
      price: 0;
    };
    ingredients: TConstructorIngredient[];
  };
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
  orders: [],
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  }
};

export const fetchUser = createAsyncThunk('users/fetchUser', async () =>
  getUserApi()
);

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () =>
  getFeedsApi()
);
export const fun = () => {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addIngredient(state, action) {
      state.constructorItems.ingredients.push(action.payload);
    },
    addBuns(state, action) {
      state.constructorItems.bun = action.payload;
    },
    deleteIngredient(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (element) => element._id !== action.payload
        );
    }

    // upIngredient(state, action) {
    //   state.constructorItems.ingredients = state.constructorItems.ingredients.splice(0, 1, action.payload);
    // }
  },

  extraReducers: (builder) => {
    //Feeds
    builder.addCase(fetchFeeds.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
    });

    builder.addCase(fetchFeeds.rejected, (state, action) => {
      state.isLoading = false;
    });

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

export const { addIngredient, addBuns, deleteIngredient } = userSlice.actions;
export default userSlice.reducer;
