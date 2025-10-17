import {
  fetchWithRefresh,
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  orderBurgerApi,
  refreshToken,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IUserOrder,
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TUser
} from '@utils-types';
import { setCookie } from '../../utils/cookie';
import { error } from 'console';

interface userState {
  isLoading: boolean;
  user: TUser;
  ingredients: TIngredient[];
  isAuthCheked: boolean;
  isAuthenticated: boolean;
  orderData: TOrder | null;
  loginUserError: null;
  loginUserRequest: boolean;
  order: string[];
  ordersUser: TOrder[];
  orderNumber: number | null;
  feed: {
    total: number;
    totalToday: number;
    success: boolean;
    orders: TOrder[];
  };
  constructorItems: {
    bun: TIngredient;
    ingredients: TConstructorIngredient[];
  };
}

const initialState: userState = {
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  orderNumber: null,
  ordersUser: [],
  ingredients: [],
  isAuthCheked: false,
  isAuthenticated: false,
  orderData: null,
  loginUserError: null,
  loginUserRequest: false,
  feed: {
    total: 0,
    totalToday: 0,
    success: false,
    orders: []
  },
  order: [],
  constructorItems: {
    bun: {
      _id: '',
      name: '',
      type: '',
      proteins: 0,
      fat: 0,
      carbohydrates: 0,
      calories: 0,
      price: 0,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    ingredients: []
  }
};

//Регистрация пользователя
export const fetchPostUserData = createAsyncThunk(
  'fetchPostUserData/userData',
  async (data: TRegisterData, { dispatch, rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      console.log(response);
      return response.success;
    } catch (error) {
      rejectWithValue(error);
      console.log(error);
    }
  }
);

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

//Логин
export const fetchPostLoginUser = createAsyncThunk(
  'fetchPostLoginUser/userData',
  async (data: TLoginData, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      setCookie('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

//Получение данных пользователя
export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  try {
    const response = await getUserApi();
    return response;
  } catch (error) {
    console.log(error);
    const response = await refreshToken();
  }
});

//Получение ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

//Получение всех заказов
export const fetchFeeds = createAsyncThunk('feed/fetchFeeds', async () =>
  getFeedsApi()
);

//Выход
export const fetchUserLogout = createAsyncThunk(
  'fetchUserLogout/userData',
  async () => {
    try {
      const response = await logoutApi();
      localStorage.clear();
      return response.success;
    } catch (error) {
      console.log(error);
    }
  }
);

//Получение определенного заказа
export const fetchOrderById = createAsyncThunk(
  'fetchOrderById/0rder',
  async (data: number) => {
    try {
      const response = await getOrderByNumberApi(data);
      return response.orders;
    } catch (error) {
      console.log(error);
    }
  }
);

//Получение заказов пользователя
export const fetchUserOrders = createAsyncThunk('fetchUserOrders', async () =>
  getOrdersApi()
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addOrder(state, action) {
      state.order.push(action.payload);
    },
    addIngredient(state, action) {
      state.constructorItems.ingredients.push(action.payload);
    },

    fetchUserLogout(state, action) {
      state.isAuthenticated = false;
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
      state.constructorItems.ingredients = initiaConstructorItems;
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
      state.constructorItems.ingredients = initiaConstructorItems;
    }
  },

  extraReducers: (builder) => {
    //order
    builder.addCase(fetchPostOrder.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchPostOrder.fulfilled, (state, action) => {
      if (!action.payload) return;
      state.orderNumber = action.payload.order.number;
    });

    //order by id
    builder.addCase(fetchOrderById.pending, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      if (!action.payload) return;
      // state.orderData = action.payload
    });

    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.isLoading = false;
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

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      action.payload ? (state.user = action.payload.user) : '';
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.isAuthCheked = false;
    });

    //logout
    builder.addCase(fetchUserLogout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
    });

    //userOrders
    builder.addCase(fetchUserOrders.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      action.payload ? (state.ordersUser = action.payload) : '';
    });

    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isLoading = false;
    });
  }
});

export const {
  addIngredient,
  addBuns,
  deleteIngredient,
  downIngredient,
  upIngredient,
  addOrder
} = userSlice.actions;
export default userSlice.reducer;
