import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type ConstructorState = {
  order: string[];
  ingredients: TIngredient[];
  constructorItems: {
    bun: TIngredient;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: ConstructorState = {
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
  },
  ingredients: []
};

//Получение ингредиентов
export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () =>{
    try {
      const result = await getIngredientsApi()
      return result
    }catch(error) {
      console.log(error)
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

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addOrder(state, action) {
      state.order.push(action.payload);
    },
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
  // selectors: {
  //   selectConstructorItems: (state) => state.constructorItems,
  //   selectOrder: (state) => state.order,
  //   selectBun: (state) => state.constructorItems.bun,
  //   selectorIngredients: (state) => state.ingredients
  // },
  extraReducers: (builder) => {
    //Ingredients
    builder.addCase(fetchIngredients.pending, (state, action) => {});

    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredients = action.payload || [];
      console.log(action.payload)
    });

    builder.addCase(fetchIngredients.rejected, (state, action) => {});

    //order
    builder.addCase(fetchPostOrder.pending, (state, action) => {
      
    });

    builder.addCase(fetchPostOrder.fulfilled, (state, action) => {
      if (!action.payload) return;
    });
  }
});

// export const {
//   selectConstructorItems,
//   selectOrder,
//   selectBun,
//   selectorIngredients
// } = constructorSlice.selectors;

export const {
  addBuns,
  addIngredient,
  addOrder,
  deleteIngredient,
  upIngredient,
  downIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
