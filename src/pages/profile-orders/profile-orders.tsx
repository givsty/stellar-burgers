import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchUserOrders } from '../../services/reducers/userSlice';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders = useAppSelector((state) => state.ordersUser);
  const isAuth = useAppSelector(state => state.isAuthCheked)
  const isLoading = useAppSelector(state => state.isLoading)
  const dispatch = useAppDispatch();

  dispatch(fetchUserOrders());

  if (!orders.length && isLoading) {
    return <Preloader />;
  }
  
  return <ProfileOrdersUI orders={orders} />;
};
