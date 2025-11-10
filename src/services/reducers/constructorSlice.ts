import { getIngredientsApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type orderSlice = {
  order: string[];
  ingredients: TIngredient[];
  isLoadingIngredients: boolean;
  constructorItems: {
    bun: TIngredient;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: orderSlice = {
  order: [],
  isLoadingIngredients: false,
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

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const constructorSlice = createSlice({
  name: 'constructorSlice',
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
  extraReducers: (builder) => {
    //Ingredients
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoadingIngredients = true;
    });

    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoadingIngredients = false;
      state.ingredients = action.payload;
      state.isLoadingIngredients = false;
      state.ingredients = action.payload;
    });

    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoadingIngredients = false;
    });
  }
});

export const {
  addBuns,
  addIngredient,
  addOrder,
  deleteIngredient,
  upIngredient,
  downIngredient
} = constructorSlice.actions;

export default constructorSlice.reducer;
