import styles from './ResetPassword.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoEye } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import { FaEyeSlash } from 'react-icons/fa';

import exclamation from './../../images/exclamation.svg';
import { resetPassword } from '../../Redux/userSlice/userSlice';
import { ROUTES } from '../../const';
import Button from '../UI/Button/Button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { requestId } = useParams();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);
  const [err, setErr] = useState('');
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

  const onSubmit = (obj) => {
    setIsLoading(true);
    setIsLoadingRequest(false);
    setIsLoadingErr(false);
    const data = { requestId: requestId, body: { newPassword: obj.password } };
    dispatch(resetPassword(data)).then((response) => {
      if (response.payload?.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        setIsLoadingRequest(true);
        setIsLoadingErr(true);
        reset();
      }
      if (response.payload?.status === 201) {
        navigate(ROUTES.LOGIN);
      }
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
  return (
    <div className={styles.resetPassword}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Смена пароля</h2>
        {isLoadingErr && <p className={styles.err}>{err}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.group}>
            <label>
              <h3>Введите новый пароль</h3>
              <div className={styles.inputPassword}>
                <input
                  type={!visiblePassword ? 'password' : 'text'}
                  {...register('password', {
                    required: 'Поля обязательное к заполнению',
                  })}
                />
                {visiblePassword ? (
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
              )}
            </label>
          </div>
          <div className={styles.group}>
            <label>
              <h3>Повторите пароль</h3>
              <div className={styles.inputPassword}>
                <input
                  type={!visibleRepeatPassword ? 'password' : 'text'}
                  {...register('repeatPassword', {
                    required: 'Поля обязательное к заполнению',
                    validate: (value, formValues) =>
                      value === formValues.password || 'Пароли не совпадают',
                  })}
                />
                {visibleRepeatPassword ? (
                  <button
                    className={styles.btnEye}
                    onClick={(e) => handleClickVisibleRepeatPassword(e)}
                  >
                    <IoEye color={'black'} size={22} />
                  </button>
                ) : (
                  <button
                    className={styles.btnEye}
                    onClick={(e) => handleClickVisibleRepeatPassword(e)}
                  >
                    <FaEyeSlash color={'black'} size={22} />
                  </button>
                )}
              </div>

              {errors?.repeatPassword && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.repeatPassword.message}</p>
                </div>
              )}
            </label>
          </div>

          {/* <Button styleWidth={styles.width} disabled={!isValid || isLoading}>
            Сохранить
          </Button> */}
          <Button disabled={!isValid || isLoading} styleWidth={styles.width}  styleMargin={styles.buttonMargin} >
            {!isLoadingRequest? <AiOutlineLoading3Quarters size={18}  className='rotating-svg'/> : "Сохранить"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
