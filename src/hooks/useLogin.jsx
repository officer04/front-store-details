import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { addUser, login } from '../Redux/userSlice/userSlice';
import { ROUTES } from '../const';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(login(data)).then((response) => {
      if (response.payload.response?.status === 400) {
        setError(response.payload.response.data.message);
        setIsLoading(false);
        reset();
        return;
      }

      if (response.payload?.status === 200) {
        setIsLoading(false);
        const token = response.payload.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        dispatch(addUser(user));
        navigate(ROUTES.ASSORTMENT);
        setIsLoading(false);
        return;
      }
      setError('Ошибка на сервере, попробуйте позже');
      setIsLoading(false);
    });
  };

  const handleClickVisiblePassword = (e) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    error,
    formError: errors,
    isValid,
    handleClickVisiblePassword,
    visiblePassword,
    isLoading,
  };
};
