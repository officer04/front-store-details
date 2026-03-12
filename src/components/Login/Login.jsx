import styles from './Login.module.scss';

import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

import { EMAIL_PATTERN, ROUTES } from '../../const';
import { useLogin } from '../../hooks/useLogin';

import Button from '../UI/Button/Button';
import { InputField } from '../UI/InputField/InputField';

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
    isLoading,
  } = useLogin();

  return (
    <section className={styles.login}>
      <div className={styles.wrapper}>
        <h1 className={styles.head}>Авторизация</h1>
        {error && <p className={styles.err}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type='email'
            label='Электронная почта'
            placeholder="'Электронная почта"
            register={register}
            name={'email'}
            error={formError?.email?.message}
            validation={{
              required: 'Поле обязательно к заполнению',
              pattern: {
                value: EMAIL_PATTERN,
                message: 'Почта указана не верно',
              },
            }}
          />
          <InputField
            type={visiblePassword? "text" : 'password'}
            label='Пароль'
            placeholder="Пароль"
            register={register}
            icon={true}
            name={'password'}
            error={formError?.password?.message}
            onClick={handleClickVisiblePassword}
            icon1={<IoEye color={'black'} size={22} />}
            icon2={<FaEyeSlash color={'black'} size={22} />}
            visibleIcon={visiblePassword}
            validation={{
              required: 'Поле обязательно к заполнению',
            }}
          />
          <div className={styles.resetPassword}>
            <Button to={ROUTES.RESET_PASSWORD_REQUEST}>Забыли пароль?</Button>
          </div>
          <Button
            type="submit"
            size="large"
            variant="outline"
            disabled={!isValid || isLoading}
            loading={isLoading}
            className={styles.button}
          >
            Войти
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
