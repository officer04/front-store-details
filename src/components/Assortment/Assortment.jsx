import styles from './Assortment.module.scss';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Card from '../Card/Card';
import img1 from './../../images/engine.png';
import img2 from './../../images/pendant.png';
import img3 from './../../images/electric.png';
import img4 from './../../images/liquid.png';
import img5 from './../../images/carСosmetics.png';
import img6 from './../../images/automotiveProducts.png';

import { getProductsBasket } from '../../Redux/userSlice/userSlice';

const products = [
  {
    id: '69aa38f28f894c9186499cca',
    title: 'Детали двигателя',
    text: 'для любых иномарок',
    img: img1,
  },
  {
    id: '69aa38f28f894c9186499cca',
    title: 'Детали подвески',
    text: 'для любых иномарок',
    img: img2,
  },
  {
    id: '69aa38f28f894c9186499cca',
    title: 'Электротехнические детали',
    text: 'для любых иномарок',
    img: img3,
  },
  {
    id: '6671c7a63247ddd9ff67906b',
    title: 'Масла и спец. жидкости',
    text: 'для любых иномарок',
    img: img4,
  },
  { id: '6671c7b43247ddd9ff67906d', title: 'Автокосметика', text: 'для любых иномарок', img: img5 },
  {
    id: '6671c7c93247ddd9ff67906f',
    title: 'Автотовары',
    text: 'для любых иномарок пусковые провода, японские щетки стеклоочистителя, щетки для очистки снега, автомобильный сигнал, наборы инструментов',
    img: img6,
  },
];

const Assortment = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsBasket());
  }, [dispatch]);
  return (
    <div className={styles.assortment}>
      <div className={styles.head}>
        <h1 className={styles.title}>Ассортимент</h1>
        <p className={styles.subtitle}>КУПИТЕ ВСЕ ЗАПЧАСТИ В ОДНОМ МЕСТЕ</p>
      </div>

      <div className={styles.informationShop}>
        <p>30 ТЫС. ДЕТАЛЕЙ В НАЛИЧИИ В НАШЕМ МАГАЗИНЕ.</p>
        <p>ТЫСЯЧИ ПОЗИЦИЙ НА СКЛАДЕ В КРАСНОЯРСКЕ.</p>
        <p>Мы - надежный ОНЛАЙН магазин который существует с 2014 года</p>
        <p>
          В «Auto detail» вы сможете купить запчасти любой сложности для японских, европейских,
          корейских и китайских автомобилей.
        </p>
        <p>
          Если в данный момент нужной вам детали нет в наличии, мы доставим ее для вас до двери.
        </p>
        <h3>В течение 4 рабочих дней и без предоплаты.</h3>
      </div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          {products.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              img={product.img}
              title={product.title}
              text={product.text}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assortment;
