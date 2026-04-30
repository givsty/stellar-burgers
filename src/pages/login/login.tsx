import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { fetchPostLoginUser } from '../../services/reducers/userSlice';
import { useDispatch } from '../../services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
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
