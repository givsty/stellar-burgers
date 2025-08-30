import {
  fetchWithRefresh,
  getFeedsApi,
  getIngredientsApi,
  getUserApi,
  loginUserApi,
  orderBurgerApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';

interface userState {
  isLoading: boolean;
  user: TUser;
  ingredients: TIngredient[];
  isAuthCheked: boolean;
  isAuthenticated: boolean | undefined;
  orderData: TOrder;
  loginUserError: null;
  loginUserRequest: boolean;
  orders: string[];
  feed: {
    total: number;
    totalToday: number;
    success: boolean;
    orders: TOrder[];
  };
  constructorItems: {
    bun: {
      price: 0;
    };
    ingredients: TConstructorIngredient[];
  };
}

const initialState: userState = {
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  ingredients: [],
  isAuthCheked: false,
  isAuthenticated: false,
  orderData: {
    _id: '',
    status: '',
    name: '',
    createdAt: '',
    updatedAt: '',
    number: 0,
    ingredients: []
  },
  loginUserError: null,
  loginUserRequest: false,
  feed: {
    total: 0,
    totalToday: 0,
    success: false,
    orders: []
  },
  orders: [],
  constructorItems: {
    bun: {
      price: 0
    },
    ingredients: []
  }
};

export const fetchPostUserData = createAsyncThunk(
  'fetchPostUserData/userData',
  async (data: TRegisterData, { dispatch, rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      console.log(response);
      return response;
    } catch (error) {
      rejectWithValue(error);
      console.log(error);
    }
  }
);

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

export const fetchPostLoginUser = createAsyncThunk(
  'fetchPostLoginUser/userData',
  async (data: TLoginData, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      localStorage.setItem('token', response.accessToken);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchLogoutUser = createAsyncThunk(
  'fetchLogoutUser/userData',
  async () => {
    try {
    } catch (error) {}
  }
);
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addOrder(state, action) {},
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
    },
    downIngredient(state, action) {
      const initiaConstructorItems = state.constructorItems.ingredients;
      [
        initiaConstructorItems[action.payload],
        initiaConstructorItems[action.payload + 1]
      ] = [
        initiaConstructorItems[action.payload + 1],
        initiaConstructorItems[action.payload]
      ];
      state.constructorItems.ingredients = initiaConstructorItems
    },

    upIngredient(state, action) {
      const initiaConstructorItems = state.constructorItems.ingredients;
      [
        initiaConstructorItems[action.payload],
        initiaConstructorItems[action.payload - 1]
      ] = [
        initiaConstructorItems[action.payload - 1],
        initiaConstructorItems[action.payload]
      ];
      state.constructorItems.ingredients = initiaConstructorItems
    }
  },

  extraReducers: (builder) => {
    //order
    builder.addCase(fetchPostOrder.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostOrder.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.orders.push();
    });

    //register
    builder.addCase(fetchPostUserData.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostUserData.fulfilled, (state, action) => {
      state.isAuthenticated = true;
    });

    builder.addCase(fetchPostUserData.rejected, (state, action) => {
      state.isLoading = false;
    });

    //login
    builder.addCase(fetchPostLoginUser.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostLoginUser.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.isAuthenticated = true;
      state.user = {
        email: action.payload.user.email,
        name: action.payload.user.name
      };
      state.isLoading = false;
    });

    builder.addCase(fetchPostLoginUser.rejected, (state, action) => {
      state.isLoading = false;
    });

    //Feeds
    builder.addCase(fetchFeeds.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      state.feed = action.payload;
      state.isAuthenticated = true;
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

    //get user
    builder.addCase(fetchUser.pending, (state, action: PayloadAction) => {
      state.isLoading = false;
    });

    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<{ user: TUser }>) => {
        state.user = action.payload.user;
      }
    );

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthCheked = false;
    });
  }
});

export const { addIngredient, addBuns, deleteIngredient, downIngredient, upIngredient } =
  userSlice.actions;
export default userSlice.reducer;
