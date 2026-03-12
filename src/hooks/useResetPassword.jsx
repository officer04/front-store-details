import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../Redux/userSlice/userSlice';
import { useParams } from 'react-router-dom';
import { ROUTES } from '../const';
import { useNavigate } from 'react-router-dom';

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestId } = useParams();

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (obj) => {
    setIsLoading(true);
    const data = { requestId: requestId, body: { newPassword: obj.password } };
    dispatch(resetPassword(data)).then((response) => {
      if (response.payload.response?.status === 400) {
        setError(response.payload.response.data.message);
        setIsLoading(false);
        reset();
        return;
      }

      if (response.payload?.status === 201) {
        navigate(ROUTES.LOGIN);
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

  const handleClickVisibleRepeatPassword = (e) => {
    e.preventDefault();
    setVisibleRepeatPassword(!visibleRepeatPassword);
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    error,
    handleClickVisiblePassword,
    handleClickVisibleRepeatPassword,
    visiblePassword,
    visibleRepeatPassword,
    formError: errors,
    isValid,
    isLoading,
  };
};
