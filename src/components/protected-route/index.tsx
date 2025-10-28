import React, { FC, ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  // const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  // const isLoading = useAppSelector((state) => state.isLoading);
  const token = localStorage.getItem('refreshToken');

  // if (!isAuthenticated && isLoading) {
  //   return <Preloader />;
  // }

  // if (!token) {
  //   return <Navigate replace to='/login' />;
  // }

  return children;
};
