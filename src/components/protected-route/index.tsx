import React, { FC, ReactNode, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Register } from '@pages';
import { fetchUser } from '../../services/reducers/userSlice';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  // is Authenticated пока не активная раскомментировать после того как будет готов настоящий токен
  if (!isAuthenticated && !token) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
