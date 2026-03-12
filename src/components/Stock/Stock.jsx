import styles from './Stock.module.scss';
import telegram from './../../images/telegram.svg';
import ButtonLink from '../UI/ButtonLink/ButtonLink';
import { ROUTES } from './../../const';
import { Link } from 'react-router-dom';

const Stock = () => {
  const products = [
    { id: '6671c3732c536c0e510e21d2', img: '/img/product1.jpg' },
    { id: '6671c7b43247ddd9ff67906d', img: '/img/product2.jpg' },
  ];

  return (
    <div className={styles.stock}>
      <h1 className={styles.title}>АКЦИИ</h1>
      <p className={styles.subtitle}>СЭКОНОМЬТЕ ДО -15%</p>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {products.map((product) => (
            <Link to={`${ROUTES.PRODUCTS}/${product.id}`}>
              <img width={350} height={300} src={product.img} alt={product.img} />
            </Link>
          ))}
        </div>
        <p className={styles.text}>
          Подпишитесь на нас в “Telegram”, чтобы воспользоваться постоянно действующими
          спецпредложениями.
        </p>
        <h3>На своей странице мы</h3>
        <ul className={styles.nav}>
          <li>Обращаем внимание на важные нюансы в обслуживании авто.</li>
          <li>Показываем достойные бренды автозапчастей.</li>
          <li>Обращаем внимание на важные нюансы в обслуживании авто.</li>
        </ul>
        <div className={styles.buttonWrapper}>
          <ButtonLink to={ROUTES.TELEGRAM}>Перейти</ButtonLink>
          <img className={styles.buttonImg} src={telegram} width={30} height={30} alt={telegram} />
        </div>
      </div>
    </div>
  );
};

export default Stock;
