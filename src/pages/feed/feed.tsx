import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchFeeds } from '../../services/reducers/userSlice';
import { getFeedsApi } from '@api';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.feed.orders);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  async function updateGetFeeds() {
    getFeedsApi();
  }

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateGetFeeds} />;
};
