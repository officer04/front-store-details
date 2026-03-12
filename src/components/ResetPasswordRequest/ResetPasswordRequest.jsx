import styles from './ResetPasswordRequest.module.scss';

import { ROUTES } from '../../const';
import { useResetPasswordRequest } from '../../hooks/useResetPasswordRequest';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../UI/InputField/InputField';
import { EMAIL_PATTERN } from '../../const';

import Button from '../UI/Button/Button';
import SuccessMessage from '../SuccessMessage/SuccessMessage';

const ResetPasswordRequest = () => {
  const {
    onSubmit,
    handleSubmit,
    register,
    error,
    email,
    isVisibleForm,
    formError,
    isValid,
    isLoading,
  } = useResetPasswordRequest();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <div className={styles.resetPassword}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        {!isVisibleForm && (
          <p className={styles.text}>
            Введите почту и письмо для сброса пароля будет отправленно вам на аккаунт
          </p>
        )}
        {error && <p className={styles.err}>{error}</p>}
        {!isVisibleForm ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.input}>
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
        ) : (
          <SuccessMessage email={email} onClose={handleClick}/>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
