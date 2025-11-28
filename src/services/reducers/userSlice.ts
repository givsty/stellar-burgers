import {
  forgotPasswordApi,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

interface userState {
  isLoadingUserFeeds: boolean;
  isLoading: boolean;
  user: TUser;
  isAuthCheked: boolean;
  isAuthenticated: boolean;
  loginUserError: null;
  loginUserRequest: boolean;
  ordersUser: TOrder[];
  orderNumber: number | null;
}

const initialState: userState = {
  isLoadingUserFeeds: false,
  isLoading: false,
  user: {
    email: '',
    name: ''
  },
  orderNumber: null,
  ordersUser: [],
  isAuthCheked: false,
  isAuthenticated: false,
  loginUserError: null,
  loginUserRequest: false
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

//Сброс пароля
export const fetchResetPassword = createAsyncThunk(
  'fetchResetPassword/user',
  async (data: { email: string }) => {
    try {
      const respone = await forgotPasswordApi(data);
      return respone;
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
  reducers: {},
  extraReducers: (builder) => {
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
      state.isLoading = false;
    });

    //logout
    builder.addCase(fetchUserLogout.fulfilled, (state, action) => {
      state.isAuthenticated = false;
    });

    //Reset password
    builder.addCase(fetchResetPassword.pending, (state, action) => {});
    builder.addCase(fetchResetPassword.fulfilled, (state, action) => {});
    builder.addCase(fetchResetPassword.rejected, (state, action) => {});

    //userOrders
    builder.addCase(fetchUserOrders.pending, (state, action) => {
      state.isLoadingUserFeeds = true;
    });

    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      action.payload ? (state.ordersUser = action.payload) : '';
      state.isLoadingUserFeeds = false;
    });

    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isLoadingUserFeeds = false;
    });
  }
});

export default userSlice.reducer;
