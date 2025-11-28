import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { fetchPostOrder } from '../../services/reducers/orderSlice';
import { clearModalData } from '../../services/reducers/orderSlice';
import { clearConstructor } from '../../services/reducers/constructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const orderRequest = useSelector((state) => state.order.orderRequest);
  const constructorItems = useSelector(
    (state) => state.constructorSlice.constructorItems
  );
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const orderModalData = useSelector((state) => state.order.orderData);
  const order = useSelector((state) => state.constructorSlice.order);
  const constructorIngredientsBun = useSelector(
    (state) => state.constructorSlice.constructorItems.bun
  );

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!isAuth) {
      return navigate('/login');
    }

    if (!isAuth) navigate('/login');
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
