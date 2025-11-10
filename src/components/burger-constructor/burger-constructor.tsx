import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector } from '../../services/store';
import { fetchPostOrder } from '../../services/reducers/orderSlice';
import { useAppDispatch } from '../hooks/redux';
import { clearModalData } from '../../services/reducers/orderSlice';
import { clearConstructor } from '../../services/reducers/constructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useAppDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const constructorItems = useSelector(
    (state) => state.constructorSlice.constructorItems
  );
  const orderModalData = useSelector((state) => state.order.orderData);
  const order = useSelector((state) => state.constructorSlice.order);
  const constructorIngredientsBun = useSelector(
    (state) => state.constructorSlice.constructorItems.bun
  );

  const onOrderClick = () => {
    // if (orderRequest && !constructorItems.bun) return '';
    const orderData = [...order, constructorIngredientsBun._id];
    dispatch(fetchPostOrder(orderData));
  };

  const closeOrderModal = () => {
    dispatch(clearModalData());
    dispatch(clearConstructor());
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
