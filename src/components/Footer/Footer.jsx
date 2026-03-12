import styles from './Footer.module.scss';

import { Link } from 'react-router-dom';

import { ROUTES } from '../../const';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.nav}>
          <li>
            © 2023 «Автодитейл» автозапчасти <br /> г. Красноярск, ул. Мира , д. 96
          </li>
          <li>
            <Link to={ROUTES.HOME}>Главная страница</Link>
          </li>
          <li>Политика конфиденциальности</li>
          <li>
            <Link to={ROUTES.CONTACTS}>Контакты</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
