import styles from './ResetPassword.module.scss';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import { useResetPassword } from '../../hooks/useResetPassword';

import Button from '../UI/Button/Button';
import { InputField } from '../UI/InputField/InputField';

const ResetPassword = () => {
  const {
    onSubmit,
    handleSubmit,
    register,
    error,
    formError,
    isValid,
    visibleRepeatPassword,
    visiblePassword,
    handleClickVisiblePassword,
    handleClickVisibleRepeatPassword,
    isLoading,
  } = useResetPassword();
  return (
    <div className={styles.resetPassword}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Смена пароля</h2>
        {error && <p className={styles.err}>{error}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <InputField
            type={!visiblePassword ? 'password' : 'text'}
            label="Введите новый пароль"
            placeholder="Введите новый пароль"
            register={register}
            name={'password'}
            icon={true}
            visibleIcon={visiblePassword}
            onClick={handleClickVisiblePassword}
            icon1={<IoEye color={'black'} size={22} />}
            icon2={<FaEyeSlash color={'black'} size={22} />}
            error={formError?.password?.message}
            validation={{
              required: 'Поле обязательно к заполнению',
            }}
          />
          <InputField
            type={!visibleRepeatPassword ? 'password' : 'text'}
            label="Повторите пароль"
            placeholder="Повторите пароль"
            register={register}
            name={'repeatPassword'}
            icon={true}
            visibleIcon={visibleRepeatPassword}
            onClick={handleClickVisibleRepeatPassword}
            icon1={<IoEye color={'black'} size={22} />}
            icon2={<FaEyeSlash color={'black'} size={22} />}
            error={formError?.repeatPassword?.message}
            validation={{
              required: 'Поля обязательное к заполнению',
              validate: (value, formValues) =>
                value === formValues.password || 'Пароли не совпадают',
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
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
