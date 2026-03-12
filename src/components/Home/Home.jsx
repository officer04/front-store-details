import styles from './Home.module.scss';

import { Link } from 'react-router-dom';

import { ROUTES } from './../../const';

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Магазин новых запчастей для японских, европейских, корейских и китайских автомобилей.
        </h1>
        <Link className={styles.button} to={ROUTES.ASSORTMENT}>Ассортимент</Link>
      </div>
    </div>
  );
};

export default Home;
