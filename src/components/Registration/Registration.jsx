import { Link,  useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import exclamation from './../../images/exclamation.svg';
import styles from './Registration.module.scss';
import { ROUTES } from '../../const';
import Button from '../UI/Button/Button';
import { useDispatch } from 'react-redux';
import { addUser, registration } from '../../Redux/userSlice/userSlice';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(registration(data)).then((response) => {
      if (response.payload.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        setIsLoadingRequest(true);
        setIsLoadingErr(true);
        reset();
        return
      }

      if (response.payload?.status === 201) {
        setIsLoading(false);
        const token = response.payload.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        dispatch(addUser(user));
        navigate(ROUTES.ASSORTMENT);
        return
      }
      setIsLoadingErr(true);
      setErr("Ошибка на сервере, попробуйте позже")
      setIsLoadingRequest(true);
      setIsLoading(false);
    });
  };

  const handleClickVisiblePassword = (e) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  return (
    <section className={styles.registration}>
      <div className={styles.wrapper}>
        <h1 className={styles.head}>Регистрация</h1>
        {isLoadingErr && <p className={styles.err}>{err}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.groupEmail}>
            <label>
              <h3>Имя</h3>
              <div className={styles.inputEmail}>
                <input
                  placeholder="Имя"
                  autoComplete="username"
                  {...register('username', {
                    required: 'Поля обязательное к заполнению',
                  })}
                />
              </div>

              {errors?.username && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.username.message}</p>
                </div>
              )}
            </label>
            <label>
              <h3>Электронная почта</h3>
              <div className={styles.inputEmail}>
                <input
                  placeholder="Почта"
                  autoComplete="email"
                  type="email"
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
                  placeholder="Пароль"
                  type={visiblePassword ? 'password' : 'text'}
                  {...register('password', {
                    required: 'Поля обязательное к заполнению',
                  })}
                />
                {!visiblePassword ? (
                  <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                    <IoEye color={'black'} size={22} />
                  </button>
                ) : (
                  <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                    <FaEyeSlash color={'black'} size={22} />
                  </button>
                )}
              </div>
              {errors?.password && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.password.message}</p>
                </div>
              )}{' '}
            </label>
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
          У вас уже есть аккаунт?{' '}
          <Link to={ROUTES.LOGIN}>
            <span>Войти</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Registration;
