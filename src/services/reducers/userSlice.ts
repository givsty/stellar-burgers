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
  isAuthCheked: boolean;
  isAuthenticated: boolean;
  orderData: TOrder | null;
  loginUserError: null;
  loginUserRequest: boolean;
  ordersUser: TOrder[];
  orderNumber: number | null;
}

const initialState: userState = {
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  orderNumber: null,
  ordersUser: [],
  isAuthCheked: false,
  isAuthenticated: false,
  orderData: null,
  loginUserError: null,
  loginUserRequest: false,
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserLogout(state, action) {
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {

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

  }
});


export default userSlice.reducer;
