import React, { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Register } from '@pages';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  // is Authenticated пока не активная раскоментировать после того как будет готов настоящий токен
  if (isAuthenticated) {
    return <Navigate replace to='/login' />;
  }
  return children;
};
