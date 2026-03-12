import styles from './ResetPasswordRequest.module.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';

import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

import exclamation from './../../images/exclamation.svg';
import { ROUTES } from '../../const';
import { resetPasswordRequest } from '../../Redux/userSlice/userSlice';
import Button from '../UI/Button/Button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const ResetPasswordRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(true);
  const [isLoadingErr, setIsLoadingErr] = useState(false);


  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);
  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const [err, setErr] = useState();

  const onSubmit = (data) => {
    setIsLoading(true);
    setIsLoadingRequest(false);
    setIsLoadingErr(false);
    setEmail(data.email);
    dispatch(resetPasswordRequest(data)).then((response) => {
      if (response.payload?.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        setIsLoadingRequest(true);
        setIsLoadingErr(true);
        reset();
      }


      if (response.payload?.response?.status === 500) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        setIsLoadingRequest(true);
        setIsLoadingErr(true);
        reset();
      }

      if (response.payload?.status === 201) {
        setIsVisibleForm(true);
        setIsLoading(false);
        setIsLoadingRequest(true);
        reset();
      }
    });
  };


  const handleClick = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <div className={styles.resetPassword}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        {!isVisibleForm && (
          <p className={styles.text}>Введите почту и письмо для сброса пароля будет отправленно вам на аккаунт</p>
        )}
        {isLoadingErr && <p className={styles.err}>{err}</p>}
        {!isVisibleForm ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.group}>
              <label>
                <h3>Электронная почта</h3>
                <div className={styles.inputEmail}>
                  <input
                  placeholder='Электронная почта'
                    {...register('email', {
                      required: 'Поля обязательное к заполнению',
                      pattern: {
                        value:
                          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                        message: 'Почта указана не верно',
                      },
                    })}
                  />
                </div>

                {errors?.email && (
                  <div className={styles.exclamation}>
                    <img src={exclamation} />
                    <p>{errors.email.message}</p>
                  </div>
                )}
              </label>
            </div>
            {/* <Button disabled={!isValid || isLoading} styleWidth={styles.width}>Отправить</Button> */}
            <Button disabled={!isValid || isLoading} styleWidth={styles.width}  styleMargin={styles.buttonMargin} >
            {!isLoadingRequest? <AiOutlineLoading3Quarters size={18}  className='rotating-svg'/> : "Отправить"}
          </Button>
          </form>
        ) : (
          <div className={styles.card}>
            <p>Информация по восстановлению пароля отправлена на email: {email}</p>

            {/* <p>
              Дождитесь письма и следуйте описанным в нем инструкциям. <br />
              Если вы не получили письмо, попробуйте повторить процедуру восстановления
            </p> */}
            {/* <button className={styles.button} onClick={handleClick}>
              Понятно
            </button>
            <Button>Понятно</Button> */}
            <Button disabled={!isValid || isLoading} onClick={handleClick} styleWidth={styles.width}>Понятно</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
