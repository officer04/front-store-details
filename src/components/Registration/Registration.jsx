import { Link } from 'react-router-dom';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import styles from './Registration.module.scss';
import { useRegistration } from '../../hooks/useRegistration';
import Button from '../UI/Button/Button';
import { InputField } from '../UI/InputField/InputField';
import { EMAIL_PATTERN, ROUTES } from '../../const';

const Registration = () => {
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
  } = useRegistration();

  return (
    <section className={styles.registration}>
      <div className={styles.wrapper}>
        <h1 className={styles.head}>Регистрация</h1>
        {error && <p className={styles.err}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type="text"
            label="Имя"
            placeholder="'Имя"
            register={register}
            name={'username'}
            error={formError?.username?.message}
            validation={{
              required: 'Поле обязательно к заполнению',
            }}
          />
          <InputField
            type="email"
            label="Электронная почта"
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
            type={visiblePassword ? 'text' : 'password'}
            label="Пароль"
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
