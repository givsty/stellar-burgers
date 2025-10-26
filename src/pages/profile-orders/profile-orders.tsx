import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchUserOrders } from '../../services/reducers/orderSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useAppSelector(state => state.feed.feed.orders);
  const isAuth = useAppSelector(state => state.user.isAuthCheked)
  const isLoading = useAppSelector(state => state.user.isLoading)
  const dispatch = useAppDispatch();

  dispatch(fetchUserOrders());

  if (!orders.length && isLoading) {
    return <Preloader />;
  }
  
  return <ProfileOrdersUI orders={orders} />;
};
