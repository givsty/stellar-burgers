import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { fetchFeeds } from '../../services/reducers/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.feedSlice.feed.orders);
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const updateGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (!orders.length && isLoading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateGetFeeds} />;
};
