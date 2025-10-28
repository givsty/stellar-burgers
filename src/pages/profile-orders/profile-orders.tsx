import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchUserOrders } from '../../services/reducers/orderSlice';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useSelector(state => state.feed.feed.orders);
  const isAuth = useSelector(state => state.user.isAuthCheked)
  const isLoading = useSelector(state => state.user.isLoading)
  const dispatch = useAppDispatch();

  dispatch(fetchUserOrders());

  if (!orders.length && isLoading) {
    return <Preloader />;
  }
  
  return <ProfileOrdersUI orders={orders} />;
};
