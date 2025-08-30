import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState } from '../../services/store';
import {
  fetchIngredients,
  fetchPostOrder,
  fetchUser
} from '../../services/reducers/userSlice';
import { getIngredientsApi } from '@api';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const constructorItems = useAppSelector((state) => state.constructorItems);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = false;
  const orderModalData = null;
  const orders = useAppSelector((state) => state.orders);
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(fetchPostOrder(orders));
  };

  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );
  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
