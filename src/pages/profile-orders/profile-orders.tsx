import { ProfileOrdersUI } from '@ui-pages';
import { FC } from 'react';
import { fetchUserOrders } from '../../services/reducers/userSlice';
import { Preloader } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const navigate = useNavigate();
  const orders = useSelector((state) => state.user.ordersUser);
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.isLoadingUserFeeds);
  const dispatch = useDispatch();
  dispatch(fetchUserOrders());

  if (!orders) {
    return <Preloader />;
  }

  if (orders.length === 0) {
    navigate('/profile');
  }

  return <ProfileOrdersUI orders={orders} />;
};
