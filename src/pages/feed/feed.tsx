import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchFeeds } from '../../services/reducers/userSlice';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.feed.orders);
  const isLoading = useAppSelector((state) => state.isLoading);

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
