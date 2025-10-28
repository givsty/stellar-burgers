import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchFeeds } from '../../services/reducers/feedSlice';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';
import { useSelector } from '../../services/store';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useSelector(state => state.feed.feed.orders);
  // const isLoading = useAppSelector((state) => state.isLoading);
  console.log(orders)
  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const updateGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={updateGetFeeds} />;
};
