import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useSelector } from '../../services/store';
import { fetchPostOrder } from '../../services/reducers/userSlice';
import { getIngredientsApi } from '@api';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { clearModalData } from '../../services/reducers/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useAppSelector((state) => state.order.orderRequest);
  const constructorItems = useAppSelector(
    (state) => state.user.constructorItems
  );
  const orderModalData = useSelector((state) => state.order.orderData);
  const order = useAppSelector((state) => state.user.order);
  const constructorIngredientsBun = useAppSelector(
    (state) => state.user.constructorItems.bun
  );
  const onOrderClick = () => {
    // if (orderRequest && !constructorItems.bun) return '';
    const orderData = [...order, constructorIngredientsBun._id];
    dispatch(fetchPostOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearModalData());
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
