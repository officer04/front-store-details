import styles from './ModalAccount.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { FiXSquare } from 'react-icons/fi';
import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { addUser, toggleModal, updateUser } from '../../Redux/userSlice/userSlice';

import exclamation from './../../images/exclamation.svg';
import Button from '../UI/Button/Button';


const ModalAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => user);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(true);
  const [isLoadingRequest, setIsLoadingRequest] = useState(true);
  const [isLoadingErr, setIsLoadingErr] = useState(false);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
      newPassword: "f"
    },
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    setIsLoadingRequest(false);
    setIsLoadingErr(false);
    dispatch(updateUser(data)).then((response) => {
      if (response.payload.response?.status === 400 || response.payload.response?.status === 401) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        setIsLoadingRequest(true);
        setIsLoadingErr(true);
        reset();
      }

      if (response.payload?.status === 200) {
        const token = response.payload.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        dispatch(addUser(user));
        dispatch(toggleModal(false));
        setIsLoading(false);
      }
    });
  };

  const handleClickVisiblePassword = (e) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <button className={styles.square} onClick={() => dispatch(toggleModal(false))}>
          <FiXSquare size={30} />
        </button>
        <h3 className={styles.title}>Личный кабинет</h3>
        {isLoadingErr && <p className={styles.err}>{err}</p>}
        <form className={styles.info} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h3>Имя</h3>
            <input
              className={styles.input}
              placeholder="Ввведите новое имя"
              {...register('username', {
                required: 'Поля обязательное к заполнению',
              })}
            />
            {errors?.username && (
              <div className={styles.exclamation}>
                <img src={exclamation} />
                <p>{errors.username.message}</p>
              </div>
            )}
          </label>

          <label>
            <h3>Электронная почта</h3>
            <input
              className={styles.input}
              placeholder="Ввведите новый емейл"
              {...register('email', {
                required: 'Поля обязательное к заполнению',
                pattern: {
                  value:
                    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                  message: 'Почта указана не верно',
                },
              })}
            />
            {errors?.email && (
              <div className={styles.exclamation}>
                <img src={exclamation} />
                <p>{errors.email.message}</p>
              </div>
            )}
          </label>
          <label>
            <h3>Введите ваш новый пароль</h3>
            <div className={styles.inputPassword}>
              <input
                placeholder="Ввведите новый пароль"
                className={styles.input}
                type={!visiblePassword ? 'text' : 'password'}
                {...register('newPassword', {
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

            {errors?.newpassword && (
              <div className={styles.exclamation}>
                <img src={exclamation} />
                <p>{errors.newpassword.message}</p>
              </div>
            )}
          </label>
          <Button disabled={!isValid || isLoading}  styleMargin={styles.buttonMargin} >
            {!isLoadingRequest? <AiOutlineLoading3Quarters size={15}  className='rotating-svg'/> : "Войти"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalAccount;
