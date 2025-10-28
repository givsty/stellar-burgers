import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useAppDispatch, useAppSelector } from '../../components/hooks/redux';
import { fetchPostLoginUser } from '../../services/reducers/userSlice';
import { getUserApi } from '@api';
import { Preloader } from '@ui';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setEmail('');
    setPassword('');
    dispatch(
      fetchPostLoginUser({
        email: email,
        password: password
      })
    )
      .unwrap()
      .then((response) => {
        if (!response) {
          return '';
        }
      })
      .finally(() => {
        navigate('/profile');
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
