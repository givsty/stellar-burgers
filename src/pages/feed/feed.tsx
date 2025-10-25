import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchFeeds } from '../../services/reducers/feedSlice';
import { getFeedsApi } from '@api';
import { TOrder } from '@utils-types';
import { selectFeedOrders } from '../../services/reducers/feedSlice';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectFeedOrders);
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
