import styles from './Header.module.scss';

import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SlBasket } from 'react-icons/sl';

import { getProductsBasket, removeAuth, toggleModal } from '../../Redux/userSlice/userSlice';
import { ROUTES } from '../../const';
import logo from './../../images/logo.svg';

const Header = () => {
  const { isAuth, user, productsBasket } = useSelector(({ user }) => user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsBasket())
  }, [dispatch])

  const handleClickExit = () => {
    localStorage.removeItem('token');
    dispatch(removeAuth());
    navigate(ROUTES.HOME);
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to={ROUTES.HOME} className={styles.logo}>
          <img src={logo} width={90} height={80} alt="" />
        </Link>
        <ul className={styles.nav}>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={ROUTES.HOME}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={ROUTES.ABOUT_COMPANY}
            >
              Компания
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={ROUTES.ASSORTMENT}
            >
              Ассортимент
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={ROUTES.STOCK}
            >
              Акции
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={ROUTES.CONTACTS}
            >
              Контакты
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} ${styles.active}` : styles.link
              }
              to={ROUTES.REVIEWS}
            >
              Отзывы
            </NavLink>
          </li>
        </ul>
        {!isAuth ? (
          <div className={styles.login}>
            <p className={styles.time}>пн.- вс.: 9.00-19.00</p>
            <Link className={styles.button} to={ROUTES.LOGIN}>
              Войти
            </Link>
            <p>Или</p>
            <Link to={ROUTES.REGISTRATION}>Зарегистрироваться</Link>
          </div>
        ) : (
          <div className={styles.infoUser}>
            <Link to={ROUTES.BASKET}>
              <SlBasket size={18} color='#595fef' className={styles.basket} />
              <p>{productsBasket?.countAll === 0? null : productsBasket?.countAll}</p>
            </Link>
            <p className={styles.toggle} onClick={() => dispatch(toggleModal(true))}>{user?.username}</p>
            <p className={styles.exit} onClick={handleClickExit}>
              Выйти
            </p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
