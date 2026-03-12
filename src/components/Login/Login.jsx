import styles from './Login.module.scss';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

import { addUser, login } from '../../Redux/userSlice/userSlice';
import { ROUTES } from '../../const';

import exclamation from './../../images/exclamation.svg';
import Button from '../UI/Button/Button';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [err, setErr] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(true);
  const [isLoadingErr, setIsLoadingErr] = useState(false);

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
    setIsLoadingRequest(false);
    setIsLoadingErr(false);
    dispatch(login(data)).then((response) => {
      console.log(response);
      if (response.payload.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        setIsLoadingRequest(true);
        setIsLoadingErr(true);
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
      setIsLoadingErr(true);
      setErr('Ошибка на сервере, попробуйте позже');
      setIsLoadingRequest(true);
      setIsLoading(false);
    });
  };

  const handleClickVisiblePassword = (e) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  return (
    <section className={styles.login}>
      <div className={styles.wrapper}>
        <h1 className={styles.head}>Авторизация</h1>
        {isLoadingErr && <p className={styles.err}>{err}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.groupEmail}>
            <label>
              <h3>Электронная почта</h3>
              <div className={styles.inputEmail}>
                <input
                  placeholder="Электронная почта"
                  autoComplete="email"
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
          <div className={styles.groupPassword}>
            <label>
              <h3>Пароль</h3>
              <div className={styles.inputPassword}>
                <input
                  type={visiblePassword ? 'password' : 'text'}
                  placeholder="Пароль"
                  {...register('password', {
                    required: 'Поля обязательное к заполнению',
                  })}
                />
f                <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                  {!visiblePassword ? (
                    <IoEye color={'black'} size={22} />
                  ) : (
                    <FaEyeSlash color={'black'} size={22} />
                  )}
                </button>
              </div>
              {errors?.password && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.password.message}</p>
                </div>
              )}{' '}
            </label>
          </div>
          <div className={styles.resetPassword}>
            <Button to={ROUTES.RESET_PASSWORD_REQUEST}>Забыли пароль?</Button>
          </div>
          <Button disabled={!isValid || isLoading} styleMargin={styles.buttonMargin}>
            {!isLoadingRequest ? (
              <AiOutlineLoading3Quarters size={15} className="rotating-svg" />
            ) : (
              'Войти'
            )}
          </Button>
        </form>
        <p className={styles.text}>
          У вас нет аккаунта?{' '}
          <Button to={ROUTES.REGISTRATION}>
            <span>Зарегистрироваться</span>
          </Button>
        </p>
      </div>
    </section>
  );
};

export default Login;
