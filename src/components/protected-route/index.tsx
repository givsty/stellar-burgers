import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '../../services/store';

interface ProtectedRouteProps {
  children: ReactNode;
  notAuth?: boolean;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  notAuth
}) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isLoading = useSelector((state) => state.user.isLoading);
  const token = localStorage.getItem('refreshToken');
  const location = useLocation();
  if (isLoading) return <Preloader />;

  if (!notAuth && !isAuthenticated) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (notAuth && isAuthenticated) {
    return <Navigate to='/' replace />;
  }
  return children;
};
