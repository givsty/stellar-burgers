import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState } from '../../services/store';
import {
  fetchIngredients,
  fetchOrderById,
  fetchPostOrder,
  fetchUser
} from '../../services/reducers/userSlice';
import { getIngredientsApi } from '@api';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = false;
  const orderNumber = useAppSelector(state => state.orderNumber)
  const constructorItems = useAppSelector((state) => state.constructorItems);
  const orderModalData = useAppSelector((state) => state.orderData)
  const order = useAppSelector((state) => state.order);
  const constructorIngredientsBun = useAppSelector(
    (state) => state.constructorItems.bun
  );

  const onOrderClick = () => {
    const orderData = [...order, constructorIngredientsBun._id];
    console.log(orderData);
    dispatch(fetchPostOrder(orderData))
    orderNumber ? dispatch(fetchOrderById(orderNumber)) : ''
  };

  const closeOrderModal = () => {
    navigate(-1);
  };

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
