import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchUserOrders } from '../../services/reducers/userSlice';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const navigate = useNavigate();
  const orders = useAppSelector((state) => state.user.ordersUser);
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const isLoading = useAppSelector((state) => state.user.isLoadingUserFeeds);
  const dispatch = useAppDispatch();
  dispatch(fetchUserOrders());

  if (!isLoading) {
    return <Preloader />;
  }
  
  if(orders.length === 0) {
    navigate('/profile')
  }

  return <ProfileOrdersUI orders={orders} />;
};
