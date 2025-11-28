import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = localStorage.getItem('refreshToken');

  if (!isAuthenticated && isLoading) {
    return <Preloader />;
  }

  if (!token) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
