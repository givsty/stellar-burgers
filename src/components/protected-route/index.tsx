import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Register } from '@pages';
import { fetchUser } from '../../services/reducers/userSlice';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const isLoading = useAppSelector((state) => state.user.isLoading);
  const token = localStorage.getItem('refreshToken');

  if (!isAuthenticated && isLoading) {
    return <Preloader />;
  }

  if (!token) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
