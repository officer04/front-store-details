import styles from './Login.module.scss';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

import { ROUTES } from '../../const';
import { useLogin } from '../../hooks/useLogin';

import exclamation from './../../images/exclamation.svg';
import Button from '../UI/Button/Button';

const Login = () => {

  const {
    onSubmit,
    handleSubmit,
    register,
    error,
    formError,
    isValid,
    handleClickVisiblePassword,
    visiblePassword,
    isLoading
  } = useLogin();

  return (
    <section className={styles.login}>
      <div className={styles.wrapper}>
        <h1 className={styles.head}>Авторизация</h1>
        {error && <p className={styles.err}>{error}</p>}
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

              {formError?.email && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{formError.email.message}</p>
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
                <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                  {!visiblePassword ? (
                    <IoEye color={'black'} size={22} />
                  ) : (
                    <FaEyeSlash color={'black'} size={22} />
                  )}
                </button>
              </div>
              {formError?.password && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{formError.password.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.resetPassword}>
            <Button to={ROUTES.RESET_PASSWORD_REQUEST}>Забыли пароль?</Button>
          </div>
          <Button disabled={!isValid || isLoading} styleMargin={styles.buttonMargin}>
            {isLoading ? (
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
