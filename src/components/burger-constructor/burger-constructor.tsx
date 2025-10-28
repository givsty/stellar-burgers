import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useSelector } from '../../services/store';
import {
  fetchIngredients,
  fetchOrderById,
  fetchPostOrder,
  fetchUser,
  getOrderState
} from '../../services/reducers/userSlice';
import { getIngredientsApi } from '@api';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useAppSelector(state => state.orderResponse);
  const constructorItems = useAppSelector((state) => state.constructorItems);
  const orderModalData = useSelector(getOrderState)
  const order = useAppSelector((state) => state.order);
  const constructorIngredientsBun = useAppSelector(
    (state) => state.constructorItems.bun
  );
  console.log(orderModalData)
  const onOrderClick = () => {
    if(orderRequest && !constructorItems.bun) return ''
    const orderData = [...order, constructorIngredientsBun._id];
    dispatch(fetchPostOrder(orderData))
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
