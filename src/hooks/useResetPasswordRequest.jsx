import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { resetPasswordRequest } from '../Redux/userSlice/userSlice';

export const useResetPasswordRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState()
  const dispatch = useDispatch();

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'all',
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    setEmail(data.email);
    dispatch(resetPasswordRequest(data)).then((response) => {
      if (response.payload.response?.status === 400) {
        setError(response.payload.response.data.message);
        setIsLoading(false);
        reset();
        return;
      }

      if (response.payload?.status === 201) {
        setIsVisibleForm(true)
        setIsLoading(false);
        return;
      }
      setError('Ошибка на сервере, попробуйте позже');
      setIsLoading(false);
    });
  };

  return {
    onSubmit,
    handleSubmit,
    register,
    error,
    email,
    isVisibleForm,
    formError: errors,
    isValid,
    isLoading,
  };
};
