import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import {
  deleteIngredient,
  downIngredient
} from '../../services/reducers/userSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const ingredients = useAppSelector(
      (state) => state.constructorItems.ingredients
    );

    const handleMoveDown = () => {
      dispatch(downIngredient(index));
    };

    const handleMoveUp = () => {
      console.log('вверх');
    };

    const handleClose = () => {
      dispatch(deleteIngredient(ingredient._id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
