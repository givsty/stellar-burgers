import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  addBuns,
  addIngredient,
  addOrder
} from '../../services/reducers/userSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const handleAdd = () => {
      ingredient.type === 'bun'
        ? dispatch(addBuns(ingredient))
        : dispatch(addIngredient(ingredient));

      dispatch(addOrder(ingredient._id));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
